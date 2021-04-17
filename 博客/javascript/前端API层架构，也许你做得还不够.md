上午好，今天为大家分享下个人对于前端`API`层架构的一点经验和看法。

<!-- more -->

架构设计是一条永远走不完的路，没有最好，只有更好。这个道理适用于软件设计的各个场景，前端`API`层的设计也不例外，如果您觉得在调用接口时还存在诸多槽点，那就说明您的接口层架构还待优化。今天我以`vue + axios`为例，为大家梳理下我的一些经历和设想。

# 石器时代，痛苦

直接调用`axios`，真的痛苦，每个调用的地方都要进行响应状态的判断，冗余代码超级多。

```javascript
import axios from "axios"

axios.get('/usercenter/user/page?pageNo=1&pageSize=10').then(res => {
    const data = res.data
    // 判断请求状态，success字段为true代表成功，视前后端约束而定
    if (data.success) {
        // 结果成功后的业务代码
    } else {
        // 结果失败后的业务代码
    }
})
```

看起来确实很难受，每调用一次接口，就有这么多重复的工作！

# 青铜器时代，中规中矩

为了解决直接调用`axios`的痛点，我们一般会利用`Promise`对`axios`二次封装，对接口响应状态进行集中判断，对外暴露`get`, `post`, `put`, `delete`等`http`方法。

## axios二次封装

```javascript
import axios from "axios"
import router from "@/router"
import { BASE_URL } from "@/router/base-url"
import { errorMsg } from "@/utils/msg";
import { stringify } from "@/utils/helper";
// 创建axios实例
const v3api = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 10000
});
// axios实例默认配置
v3api.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
v3api.defaults.transformRequest = data => {
    return stringify(data)
}
// 返回状态拦截，进行状态的集中判断
v3api.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.success) {
            return Promise.resolve(res)
        } else {
            // 内部错误码处理
            if (res.code === 1401) {
                errorMsg(res.message || '登录已过期，请重新登录！')
                router.replace({ path: `${BASE_URL}/login` })
            } else {
                // 默认的错误提示
                errorMsg(res.message || '网络异常，请稍后重试！')
            }
            return Promise.reject(res);
        }
    },
    error => {
        if (/timeout\sof\s\d+ms\sexceeded/.test(error.message)) {
            // 超时
            errorMsg('网络出了点问题，请稍后重试！')
        }
        if (error.response) {
            // http状态码判断
            switch (error.response.status) {
                // http status handler
                case 404:
                    errorMsg('请求的资源不存在！')
                    break
                case 500:
                    errorMsg('内部错误，请稍后重试！')
                    break
                case 503:
                    errorMsg('服务器正在维护，请稍等！')
                    break
            }
        }
        return Promise.reject(error.response)
    }
)

// 处理get请求
const get = (url, params, config = {}) => v3api.get(url, { ...config, params })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
const deletes = (url, params, config = {}) => v3api.delete(url, { ...config, params })
// 处理post请求
const post = (url, params, config = {}) => v3api.post(url, params, config)
// 处理put请求
const put = (url, params, config = {}) => v3api.put(url, params, config)
export default {
    get,
    deletes,
    post,
    put
}
```

## 调用者不再判断请求状态

```javascript
import api from "@/api";

methods: {
    getUserPageData() {
        api.get('/usercenter/user/page?pageNo=1&pageSize=10').then(res => {
            // 状态已经集中判断了，这里直接写成功的逻辑
            // 业务代码......
            const result = res.result;
        }).catch(res => {
            // 失败的情况写在catch中
        })
    }
}
```

## async/await改造

使用语义化的异步函数

```javascript
methods: {
    async getUserPageData() {
        try {
           const res = await api.get('/usercenter/user/page?pageNo=1&pageSize=10') 
           // 业务代码......
           const { result } = res;
        } catch(error) {
            // 失败的情况写在catch中
        }
    }
}
```

## 存在的问题

- 语义化程度有限，调用接口还是需要查询接口`url`
- 前端`api`层难以维护，如后端接口发生改动，前端每处都需要大改。
- 如果`UI`组件的数据模型与后端接口要求的数据结构存在差异，每处调用接口前都需要进行数据处理，抹平差异，比如`[1,2,3]`转`1,2,3`这种（当然，这只是最简单的一个例子）。这样如果数据处理不慎，调用者出错几率太高！
- 难以满足特殊化场景，举个例子，一个查询的场景，后端要求，如果输入了搜索关键词`keyword`，必须调用`/user/search`接口，如果没有输入关键词，只能调用`/user/page`接口。如果每个调用者都要判断是不是输入了关键词，再决定调用哪个接口，你觉得出错几率有多大，用起来烦不烦？
- 产品说，这些场景需要优化，默认按创建时间降序排序。我擦，又一个个改一遍？
- ......

那么怎么解决这些问题呢？请耐心接着看......

# 铁器时代，it's cool

我想到的方案是在底层封装和调用者之间再增加一层`API`适配层（适配层，取量身定制之意），在适配层做统一处理，包括参数处理，请求头处理，特殊化处理等，提炼出更语义化的方法，让调用者“傻瓜式”调用，不再为了查找接口`url`和处理数据结构这些重复的工作而烦恼，把`ViewModel`层绑定的数据模型直接丢给适配层统一处理。

## 对齐微服务架构

 首先，为了对齐后端微服务架构，在前端将`API`调用分为三个模块。 

```
├─api
    index.js axios底层封装
    ├─base  负责调用基础服务,basecenter
    ├─iot  负责调用物联网服务,iotcenter
    └─user  负责调用用户相关服务,usercenter
```

 每个模块下都定义了统一的微服务命名空间，例如`/src/api/user/index.js`： 

```javascript
export const namespace = 'usercenter';
```

## 特性模块

每个功能特性都有独立的`js`模块，以角色管理相关接口为例，模块是`/src/api/user/role.js` 

```javascript
import api from '../index'
import { paramsFilter } from "@/utils/helper";
import { namespace } from "./index"
const feature = 'role'

// 添加角色
export const addRole = params => api.post(`/${namespace}/${feature}/add`, paramsFilter(params));
// 删除角色
export const deleteRole = id => api.deletes(`/${namespace}/${feature}/delete`, { id });
// 更新角色
export const updateRole = params => api.put(`/${namespace}/${feature}/update`, paramsFilter(params));
// 条件查询角色
export const findRoles = params => api.get(`/${namespace}/${feature}/find`, paramsFilter(params));
// 查询所有角色，不传参调用find接口代表查询所有角色
export const getAllRoles = () => findRoles();
// 获取角色详情
export const getRoleDetail = id => api.get(`/${namespace}/${feature}/detail`, { id });
// 分页查询角色
export const getRolePage = params => api.get(`/${namespace}/${feature}/page`, paramsFilter(params));
// 搜索角色
export const searchRole = params => params.keyword ? api.get(`/${namespace}/${feature}/search`, paramsFilter(params)) : getRolePage(params);
```

- 每一条接口都根据`RESTful`风格，调用增（`api.post`）删（`api.deletes`）改（`api.put`）查（`api.get`）的底层方法，对外输出语义化方法。
- 调用的`url`由三部分组成，格式：`/微服务命名空间/特性命名空间/方法`
- 接口适配层函数命名规范：

- - 新增：`addXXX`
  - 删除：`deleteXXX`
  - 更新：`updateXXX`
  - 根据ID查询记录：`getXXXDetail`
  - 条件查询一条记录：`findOneXXX`
  - 条件查询：`findXXXs`
  - 查询所有记录：`getAllXXXs`
  - 分页查询：`getXXXPage`
  - 搜索：`searchXXX`
  - 其余个性化接口根据语义进行命名

## 解决问题

- 语义化程度更高，配合`vscode`的代码提示功能，用起来不要太爽！

- 迅速响应接口改动，适配层统一处理

- 集中进行数据处理（对于公用的数据处理，我们用`paramsFilter`解决，对于特殊的情况，再另行处理），调用者安心做业务即可

- 满足特殊场景，佛系应对后端和产品朋友

  - 针对上节提到的关键字查询场景，我们在适配层通过在入参中判断是否有`keyword`字段，决定调用`search`还是`page`接口。对外我们只需暴露`searchRole`方法，调用者只需要调用`searchRole`方法即可，无需做其他考虑。

  ```javascript
  export const searchRole = params => params.keyword ? api.get(`/${namespace}/${feature}/search`, paramsFilter(params)) : getRolePage(params);
  ```

  - 针对产品突然加的排序需求，我们可以在适配层去做默认入参的处理。

  首先，我们新建一个专门管理默认参数的`js`，如`src/api/default-options.js`

  ```javascript
  // 默认按创建时间降序的参数对象
  export const SORT_BY_CREATETIME_OPTIONS = {
      sortField: 'createTime',
      // desc代表降序，asc是升序
      sortType: 'desc'
  }
  ```

  接着，我们在接口适配层做集中化处理

  ```javascript
  import api from '../index'
  import { SORT_BY_CREATETIME_OPTIONS } from "../default-options"
  import { paramsFilter } from "@/utils/helper";
  import { namespace } from "./index"
  const feature = 'role'
  
  export const getRolePage = params => api.get(`/${namespace}/${feature}/page`, paramsFilter({ ...SORT_BY_CREATETIME_OPTIONS, ...params }));
  ```

  `SORT_BY_CREATETIME_OPTIONS`放在前面，是为了满足如果出现其他排序需求，调用者传入的排序字段能覆盖掉默认参数。

## mock先行

一个完善的`API`层设计，肯定是离不开`mock`的。在后端提供接口之前，前端必须通过模拟数据并行开发，否则进度无法保证。那么如何设计一个跟真实接口契合度高的`mock`系统呢？我这里简单做下分享。

- 首先，创建`mock`专用的`axios`实例

我们在`src`目录下新建`mock`目录，并在`src/mock/index.js`简单封装一个`axios`实例

```javascript
// 仅限模拟数据使用
import axios from "axios"
const mock = axios.create({
    baseURL: ''
});
// 返回状态拦截
mock.interceptors.response.use(
    response => {
        return Promise.resolve(response.data)
    },
    error => {
        return Promise.reject(error.response)
    }
)

export default mock
```

- `mock`同样也要分模块，以`usercenter`微服务下的角色管理`mock`接口为例

```
├─mock
    index.js mock底层axios封装
    ├─user  负责调用基础服务,usercenter
        ├─role
            ├─index.js
```

我们在`src/mock/user/role/index.js`中简单模拟一个获取所有角色的接口`getAllRoles`

```javascript
import mock from "@/mock";

export const getAllRoles = () => mock.get('/static/mock/user/role/getAllRoles.json')
```

可以看到，我们是在`mock`接口中获取了`static/mock`目录下的`json`数据。因此我们需要根据接口文档或者约定好的数据结构准备好`getAllRoles.json`数据

```json
{
    "success": true,
    "result": {
        "pageNo": 1,
        "pageSize": 10,
        "total": 2,
        "list": [
            {
                "id": 1,
                "createTime": "2019-11-19 12:53:05",
                "updateTime": "2019-12-03 09:53:41",
                "name": "管理员",
                "code": "管理员",
                "description": "一个拥有部分权限的管理员角色",
                "sort": 1,
                "menuIds": "789,2,55,983,54",
                "menuNames": "数据字典, 后台, 账户信息, 修改密码, 账户中心"
            },
            {
                "id": 2,
                "createTime": "2019-11-27 17:18:54",
                "updateTime": "2019-12-01 19:14:30",
                "name": "前台测试",
                "code": "前台测试",
                "description": "一个拥有部分权限的前台测试角色",
                "sort": 2,
                "menuIds": "15,4,1",
                "menuNames": "油耗统计, 车联网, 物联网监管系统"
            }
        ]
    },
    "message": "请求成功",
    "code": 0
}
```

- 我们来看看`mock`是怎么做的

先看下真实接口的调用方式

```javascript
import { getAllRoles } from "@/api/user/role";

created() {
    this.getAllRolesData()
},
methods: {
    async getAllRolesData() {
        const res = await getAllRoles()
        console.log(res)
    }
}
```

那么`mock`时怎么做呢？非常简单，只要将`mock`中提供的方法替代掉`api`提供的方法即可。

```javascript
// import { getAllRoles } from "@/api/user/role";
import { getAllRoles } from "@/mock/user/role";
```

可以看到，这种`mock`方式与调用真实接口的契合度还是挺高的，正式调试接口时，只需将注释的代码调整即可，过渡非常平滑！

- 注意，在生产环境下，为了防止打包时将`static/mock`目录下的内容`copy`到`dist`目录下，我们需要配置下`CopyWebpackPlugin`，以`vue-cli@2`为例，我们修改`webpack.base.conf.js`即可。

```javascript
const devMode = process.env.NODE_ENV === 'development';

new CopyWebpackPlugin([
    {
        from: path.resolve(__dirname, '../static'),
        to: devMode ? config.dev.assetsSubDirectory : config.build.assetsSubDirectory,
        ignore: devMode ? '' : 'mock/**/*'
    }
])
```

# 蒸汽时代，真香

下一步的设想，使用类型安全的`typescript`，让前端`API`层真正做到面向接口文档编程，规范入参，出参，可选参数，等等，提高可维护性，在编码阶段就大大降低出错几率。虽然还在重构阶段，但是我想说，重拾`typescript`是真香，突然怀念使用`Angular`的那两年了，期待`vue3.0`能将`typescript`结合得更加完美......

# 电气时代，更多畅想

未来还有无限可能，面对日渐复杂和多样化的业务场景，我们会提炼出更好的架构和设计模式。目前有一个不成熟的设想，是否能在接口设计上做到更规范化，后端输出接口文档的同时，提炼出`API json`之类的数据结构？前端拿到`API json`，通过`nodejs`文件编程的能力，自动化生成前端接口层代码，解放双手。 

# 结语

当然，以上只是我的一点点经验和设想，是在我能力范围内能想到的东西，希望能帮助到一些有需要的同学。如果大佬们有更好的经验，可以指点一二。

------
[首发链接](https://juejin.im/post/5de7169451882512454b18d8)

------

往期精彩：

- [用初中数学知识撸一个canvas环形进度条]( https://juejin.im/post/5dc626125188253aec025a60 )


![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)