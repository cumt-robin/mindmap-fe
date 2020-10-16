疫情期间我感觉整个人懒散了不少，慢慢有意识要振作起来了，恢复到正常的节奏。最近团队代码库从`Gerrit`迁移到了`Gitlab`，为了让前端团队日常开发工作**有条不紊**，**高效运转**，开发历史**可追溯**，我也查阅和学习了不少资料。参考业界主流的**Git工作流**，结合公司业务特质，我也梳理了一套**适合自己团队的Git工作流**，在这里做下分享。

<!-- more -->

# 分支管理

首先要说的是分支管理，分支管理是`git`工作流的基础，好的分支设计有助于规范开发流程，也是`CI/CD`的基础。

## 分支策略

业界主流的`git`工作流，一般会分为`develop`, `release`, `master`, `hotfix/xxx`, `feature/xxx`等分支。各个分支各司其职，贯穿了整个**开发，测试，部署**流程。我这里也基于主流的分支策略做了一些定制，下面用一张表格简单概括下：

| 分支名      | 分支定位       | 描述                                                         | 权限控制                                  |
| ----------- | :------------- | ------------------------------------------------------------ | ----------------------------------------- |
| develop     | 开发分支       | 不可以在develop分支push代码，应新建feature/xxx进行需求开发。迭代功能开发完成后的代码都会merge到develop分支。 | Develper不可直接push，可发起merge request |
| feature/xxx | 特性分支       | 针对每一项需求，新建feature分支，如feature/user_login，用于开发用户登录功能。 | Develper可直接push                        |
| release     | 提测分支       | 由develop分支合入release分支。ps: 应配置此分支触发CI/CD，部署至测试环境。 | Maintainer可发起merge request             |
| bug/xxx     | 缺陷分支       | 提测后发现的bug，应基于`develop`分支创建`bug/xxx`分支修复缺陷，修改完毕后应合入develop分支等待回归测试。 |                                           |
| master      | 发布分支       | master应处于随时可发布的状态，用于对外发布正式版本。ps: 应配置此分支触发CI/CD，部署至生产环境。 | Maintainer可发起merge request             |
| hotfix/xxx  | 热修复分支     | 处理线上最新版本出现的bug                                    | Develper可直接push                        |
| fix/xxx     | 旧版本修复分支 | 处理线上旧版本的bug                                          | Develper可直接push                        |

一般来说，`develop`, `release`, `master`分支是必备的。而`feature/xxx`, `bug/xxx`, `hotfix/xxx`, `fix/xxx`等分支纯属一种语义化的分支命名，如果要简单粗暴一点，这些分支可以不分类，都命名为`issue/issue号`，比如`issue/1`，但是要在`issue`中说明具体问题和待办事项，保证开发工作可追溯。

## 保护分支

利用`Protected Branches`，我们可以防止开发人员错误地将代码`push`到某些分支。对于普通开发人员，我们仅对`develop`分支提供`merge`权限。

![保护分支](https://qncdn.wbjiang.cn/%E4%BF%9D%E6%8A%A4%E5%88%86%E6%94%AF.png)

具体操作案例请前往下面的**实战案例**一节查看。

# issue驱动工作

我们团队采用的**敏捷开发**协作平台是腾讯的[TAPD](https://www.tapd.cn/ 'TAPD')，日常迭代需求，缺陷等都会在`TAPD`上记录。为了让`Gitlab`代码库能与迭代日常事务关联上，我决定用`Gitlab issues`来做记录，方便追溯问题。

## 里程碑

**里程碑Milestone**可以认为是一个**阶段性的目标**，比如是一轮迭代计划。里程碑可以设定时间范围，用来约束和提醒开发人员。

![milestones](https://qncdn.wbjiang.cn/%E9%87%8C%E7%A8%8B%E7%A2%91.png)

里程碑可以**拆解为N个issue**，新建`issue`时可以**关联里程碑**。比如这轮迭代一共5个需求，那么就可以新建5个`issue`。在约定的时间范围内，如果一个里程碑关联的所有`issue`都`Closed`掉了，就意味着目标顺利达成。

![创建issue](https://qncdn.wbjiang.cn/%E5%88%9B%E5%BB%BAissue.png)

## 标签

`Gitlab`提供了`label`来标识和分类`issue`，我觉得这是一个非常好的功能。我这里列举了几种`label`，用来标识`issue`的**分类**和**紧急程度**。

![标签管理](https://qncdn.wbjiang.cn/%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86.png)

## issue分类

所有的开发工作应该通过`issue`记录，包括但不限于**需求**，**缺陷**，**开发自测试**，**用户体验**等范畴。

### 需求&缺陷

这里大概又分为两种情况，一种是`TAPD`记录在案的需求和缺陷，另一种是与产品或测试人员口头沟通时传达的简单需求或缺陷（小公司会有这种情况...）。

对于`TAPD`记录的需求和缺陷，创建`issue`时应附上链接，方便查阅（上文中已有提到）。

对于口头沟通的需求和缺陷，我定了个规则，要求提出人本人在`Gitlab`上创建`issue`，并将需求或缺陷简单描述清楚，否则口头沟通的开发工作我不接（也是为了避免事后扯皮）。

**ps**：其实要求产品或者测试提`issue`，还不如上`Tapd`记录。我定这么个规则，其实就是借`Gitlab`找个说辞，**杜绝口头类需求或缺陷**，哈哈。

### 开发自测试

开发者自己发现了系统缺陷或问题，此时应该通过`issue`记录问题，并创建相应分支修改代码。

![自测试issue](https://qncdn.wbjiang.cn/%E8%87%AA%E6%B5%8B%E8%AF%95issue.png)

# 实战案例

我前面也说了，我的原则是`issue`驱动开发工作。

下面用几个例子来简单说明基本的开发流程。小公司里整个流程比较简单，没有复杂的集成测试，多轮验收测试，灰度测试等。我甚至连单元测试都没做（捂脸...）。

> 公共库和公共组件其实是很有必要做单元测试的，这里立个flag，后面一定补上单元测试。

## 需求开发

> feature/1，一个特性分支，对应issue 1

### 创建需求

正常的需求当然来源于产品经理等需求提出方，由于是通过示例说明，这里我自己在`TAPD`上模拟着写一个需求。

![TAPD创建需求](https://qncdn.wbjiang.cn/TAPD%E5%88%9B%E5%BB%BA%E9%9C%80%E6%B1%82.png)

### 创建issue

创建`Gitlab issue`，链接到`TAPD`中的相关需求。

![创建issue](https://qncdn.wbjiang.cn/%E5%88%9B%E5%BB%BAissue.png)

![一个issue](https://qncdn.wbjiang.cn/%E4%B8%80%E4%B8%AAissue.png)

### 创建分支&功能开发

基于`develop`分支创建`feature`分支进行功能开发（要保证本地git仓库当前处于develop分支，且与远程仓库develop分支同步）。

```shell
git checkout -b feature/1
```

或者直接以远程仓库的`develop`分支为基础创建分支。

```
git checkout -b feature/1 origin/develop
```

ps：我这里用的`feature/1`作为分支名，其实这里的`1`是用的`issue`号，并没有用诸如`feature/login_verify`之类的名字，是因为我觉得用`issue`号可以更方便地找到对应的`issue`，更容易追踪代码。

接着我们开始开发新功能......

![快乐地撸代码](https://qncdn.wbjiang.cn/%E5%BF%AB%E4%B9%90%E5%9C%B0%E6%92%B8%E4%BB%A3%E7%A0%81.gif)

### commit & push

完成功能开发后，我们需要提交代码并同步到远程仓库。

```
PS D:\projects\gitlab\project_xxx> git add .
PS D:\projects\gitlab\project_xxx> git cz
cz-cli@4.0.3, cz-conventional-changelog@3.1.0

? Select the type of change that you're committing: feat:     A new feature
? What is the scope of this change (e.g. component or file name): (press enter to skip)
? Write a short, imperative tense description of the change (max 94 chars):
 (9) 登录校验功能
? Provide a longer description of the change: (press enter to skip)

? Are there any breaking changes? No
? Does this change affect any open issues? Yes
? If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:
 -
? Add issue references (e.g. "fix #123", "re #123".):
 fix #1

git push origin HEAD
```

`git cz`是利用了`commitizen`来替代`git commit`。详情请点击[前端自动化部署的深度实践](https://juejin.im/post/5e38ec1ce51d4526c932a4fb)深入了解。

`fix #1`用于关闭`issue 1`。

`git push origin HEAD`则代表推送到远程仓库同名分支。

###  创建Merge Request

开发人员发起`Merge Request`，请求将自己开发的功能特性合入`develop`分支。

![创建Merge Request](https://qncdn.wbjiang.cn/%E5%88%9B%E5%BB%BAmerge%20request.png)

接着`Maintainer`需要**Review代码**，确认无误后**同意Merge**。然后这部分代码就在远程`Git`仓库入库了，其他开发同学拉取`develop`分支就能看到了。

## 版本提测

> issue/2，处理更新日志，版本号等内容，对应issue 2

每个团队的开发节奏都不同，有的团队会每日**持续集成**发版本提测，有的可能两天一次，这个就不深入讨论了......

那么当我们准备提测时，应该怎么做呢？

通过上节的了解，我们已经知道，迭代内的功能需求都会通过`feature/xxx`分支合入到`develop`分支。

提测前，一般来说，还是要更新下`CHANGELOG.md`和`package.json`的版本号，可以由`Maintainer`或其他负责该项事务的同学执行。

> 主要是执行npm version major/minor/patch -m 'something done'，具体操作可以参考[前端自动化部署的深度实践](https://juejin.im/post/5e38ec1ce51d4526c932a4fb#heading-7)一文。

```
git checkout -b issue/2 origin/develop
npm version minor -m '迭代1第一次提测'
git push origin HEAD
然后发起merge request合入develop分支
```

此时，应以最新的`develop`分支代码在开发环境跑一遍功能，保证版本自测通过。

提测时，由`Maintainer`发起`Merge Request`，将`develop`分支代码合入`release`分支，此时自动触发`Gitlab CI/CD`，自动构建并发布至**测试环境**。

版本提测后，各责任人应在`TAPD`上将相关需求和缺陷的状态变更为**“测试中”**。

## 修复测试环境bug

> bug/3，一个bug分支，对应issue 3

这里说的是在迭代周期内由测试工程师发现的测试环境中的系统`bug`，这些`bug`会被记录在敏捷开发协作平台`TAPD`上。修复测试环境`bug`的步骤与开发需求类似，这里简单说下步骤：

1. **在Gitlab上创建issue**

   > 创建issue，并附上TAPD上的缺陷链接，方便追溯

2. **创建分支&修复缺陷**

   基于`develop`分支创建分支：

   ```
   // 3是issue号
   git checkout -b bug/3 origin/develop
   ```

   接着改代码......

3. **commit & push**

   ```
   PS D:\projects\gitlab\project_xxx> git cz
   cz-cli@4.0.3, cz-conventional-changelog@3.1.0
   
   ? Select the type of change that you're committing: fix:      A bug fix
   ? What is the scope of this change (e.g. component or file name): (press enter to skip)
   ? Write a short, imperative tense description of the change (max 95 chars):
    (11) 修复一个测试环境bug
   ? Provide a longer description of the change: (press enter to skip)
   
   ? Are there any breaking changes? No
   ? Does this change affect any open issues? Yes
   ? If issues are closed, the commit requires a body. Please enter a longer description of the commit itself:
    -
   ? Add issue references (e.g. "fix #123", "re #123".):
    fix #3
    
   git push origin HEAD
   ```

4. **发起Merge Request**

   开发人员发起`Merge Request`，请求将自己修复缺陷引入的代码合入`develop`分支。

   然后`Maintainer`需要**Review代码**，同意本次`Merge Request`。

5. **等待回归测试**

   该`bug`将在下一次`CI/CD`后，进入回归测试流程。

6. **级别高的测试环境Bug**

   如果是级别很高的`bug`，比如影响了系统运行，导致测试人员无法正常测试的，应以`release`分支为基础创建`bug`分支，修改完毕后合入`release`分支，再发起`cherry pick`合入`develop`分支。

## 发布至生产环境

经过几轮持续集成和回归测试后，一个迭代版本也慢慢趋于稳定，此时也迎来了激动人心的上线时间。我们要做的就是把通过了测试的`release`分支合入`master`分支。

![release合入master](https://qncdn.wbjiang.cn/release%E5%90%88%E5%85%A5master.png)

这一步相对简单，但是要特别注意权限控制（**防止生产环境事故**），具体权限控制可以回头看第一章节**分支管理**。

与`release`分支类似，`master`分支自动触发`Gitlab CI/CD`，自动构建并发布至**生产环境**。

## 线上回滚

> revert/4，一个回滚分支，对应issue 4

代码升级到线上，但是发现报错，系统无法正常运行。此时如果不能及时排查出问题，那么只能先进行版本回退操作。

先说说**惯性思维**下，我的版本回退做法。

首先还是创建`issue`记录下：

![创建记录回滚的issue](https://qncdn.wbjiang.cn/%E5%88%9B%E5%BB%BA%E5%9B%9E%E6%BB%9A%E7%9A%84issue.png)

基于`master`分支创建`revert/4`分支

```
git checkout -b revert/4 origin/master
```

假设当前版本是`1.1.0`，我们想回退到上个版本`1.0.3`。那么我们需要先查看下`1.0.3`版本的信息。

```
PS D:\tusi\projects\gitlab\projectname> git show 1.0.3
commit 90c9170a499c2c5f8f8cf4e97fc49a91d714be50 (tag: 1.0.3, fix/1.0.2_has_bug)
Author: tusi <tusi@xxx.com.cn>
Date:   Thu Feb 20 13:29:31 2020 +0800

    fix:1.0.2

diff --git a/README.md b/README.md
index ac831d0..2ee623b 100644
--- a/README.md
+++ b/README.md
@@ -10,6 +10,8 @@

 只想修改旧版本的bug，不改最新的master

+1.0.2版本还是有个版本，再修复下
+
 特性2提交

 特性3提交
```

主要是取到`1.0.3`版本对应的`commit id`，其值为`90c9170a499c2c5f8f8cf4e97fc49a91d714be50`。

接着，我们根据`commit id`进行`reset`操作，再推送到远程同名分支。

```
git reset --hard 90c9170a499c2c5f8f8cf4e97fc49a91d714be50
git push origin HEAD
```

接着发起`Merge Request`把`revert/4`分支合入`master`分支。

![回滚分支合入master](https://qncdn.wbjiang.cn/%E5%9B%9E%E6%BB%9A%E5%88%86%E6%94%AF%E5%90%88%E5%85%A5master.png)

一般来说，这波操作没什么问题，能解决常规的回滚问题。

### 临时变通

由于`master`分支是保护分支，设置了不可`push`。如果不想通过`merge`的方式回滚，所以只能先临时设置`Maintainer`拥有`push`权限，然后由`Maintainer`进行回滚操作。

```
git checkout master
git pull
git show 1.0.3
git reset --hard 90c9170a499c2c5f8f8cf4e97fc49a91d714be50
git push origin HEAD
```

完事后，还需要记得把`master`设置为不可`push`。

> Q: 为什么不让`Maintainer`一直拥有`master`的`push`权限？
>
> A: 主要还是为了防止出现生产环境事故，给予临时性权限更稳妥！

### git reset --hard存在什么问题？

如题，`git reset --hard`确实是存在问题的。`git reset --hard`属于霸道玩法，直接移动`HEAD`指针，会丢弃之后的提交记录，如果不慎误操作了也别慌，还是可以通过查询`git reflog`找到`commitId`抢救回来的；`git reset`后还存在一个隐性的问题，如果与旧的`branch`进行`merge`操作时，会把`git reset`回滚的代码重新引入。那么怎么解决这些问题呢？

![一筹莫展](https://qncdn.wbjiang.cn/%E7%A8%8B%E5%BA%8F%E5%91%98%E4%BD%95%E8%8B%A6%E4%B8%BA%E9%9A%BE%E7%A8%8B%E5%BA%8F%E5%91%98.gif)

别慌，这个时候你必须掏出`git revert`了。

> Q: `git revert`的优势在哪？
>
> A: 首先，`git revert`是通过一次新的commit来进行回滚操作的，HEAD指针向前移动，这样就不会丢失记录；另外，`git revert`也不会引起`merge`旧分支时误引入回滚的代码。最重要的是，`git revert`在回滚的细节控制上更加优秀，可解决部分回滚的需求。

举个栗子，本轮迭代团队共完成需求`2`项，而上线后发现其中`1`项需求有致命性缺陷，需要回滚这个需求相关的代码，同时要保留另一个需求的代码。

![我太难了](https://qncdn.wbjiang.cn/%E6%88%91%E5%A4%AA%E9%9A%BE%E4%BA%86.jpg)

首先我们查看下日志，找下这两个需求的`commitId`

```shell
PS D:\tusi\projects\test\git_test> git log --oneline
86252da (HEAD -> master, origin/master, origin/HEAD) 解决冲突
e3cef4e (origin/release, release) Merge branch 'develop' into 'release'
f247f38 (origin/develop, develop) 需求2
89502c2 需求1
```

我们利用`git revert`回滚需求1相关的代码

```shell
git revert -n 89502c2
```

这时可能要解决冲突，解决完冲突后就可以`push`到远程`master`分支了。

```shell
git add .
git commit -m '回滚需求1的相关代码，并解决冲突'
git push origin master
```

感觉还是菜菜的，如果大佬们有更优雅的解决方案，求指导啊！

## 修复线上bug

> hotfix/5，一个线上热修复分支，对应issue 5

比如线上出现了系统无法登录的`bug`，测试工程师也在`TAPD`提交了缺陷记录。那么修复线上`bug`的步骤是什么呢？

1. 创建`issue`，标题可以从`TAPD`中的`Bug`单中`copy`过来，而描述就贴上`Bug`单的链接即可。

2. 基于`master`分支创建分支`hotfix/5`。

   ```
   git checkout -b hotfix/5 origin/master
   ```

3. 撸代码，修复此bug......

4. 修复完此`bug`后，提交该分支代码到远程仓库同名分支

   ```
   git push origin HEAD
   ```

5. 然后发起`cherry pick`合入到`master`和`develop`分支，并在`master`分支打上新的版本`tag`（假设当前最大的`tag`是`1.0.0`，那么新的版本`tag`应为`1.0.1`）。

## 修复线上旧版本bug

> fix/6，一个线上旧版本修复分支，对应issue 6

某些项目产品可能会有多个线上版本同时在运行，那么不可避免要解决旧版本的`bug`。针对线上旧版本出现的`bug`，修复步骤与上节类似。

1. 创建`issue`，描述清楚问题

2. 假设当前版本是`1.0.0`，而`0.9.0`版本出了一个`bug`，应基于`tag 0.9.0`创建`fix`分支。

   ```
   git checkout -b fix/6 0.9.0
   ```

3. 修复缺陷后，应打上新的`tag 0.9.1`，并推送到远程。

   ```
   git tag 0.9.1
   git push origin tag 0.9.1
   ```

4. 如果此`bug`也存在于最新的`master`分支，则需要`git push origin HEAD`提交该`fix`分支代码到远程仓库同名分支，然后发起`cherry pick`合入到`master`，此时很大可能存在冲突，需要解决冲突。

   ![cherry pick](https://qncdn.wbjiang.cn/cherry%20pick.png)

## cherry pick

在了解到`cherry pick`之前，我一直认为只有`git merge`可以合并代码，也好几次遇到合入了不想要的代码的问题。有了`cherry pick`，我们就可以合并单次提交记录，解决`git merge`时合并太多不想要的内容的烦恼，在解决`bug`时特别有用。

## git rebase

经过这段时间的使用，我发现使用`git merge`合并分支时，会让`git log`的`Graph`图看起来有点吃力。

```
PS D:\tusi\projects\gitlab\projectname> git log --pretty --oneline --graph
*   7f513b0 (HEAD -> develop) Merge branch 'issue/55' into 'release'
|\
| * 1c94437 (origin/issue/55, issue/55) fix: 【bug】XXX1
| *   c84edd6 Merge branch 'release' of host:project_repository into release
| |\
| |/
|/|
* |   115a26c Merge branch 'develop' into 'release'
|\ \
| * \   60d7de6 Merge branch 'issue/30' into 'develop'
| |\ \
| | * | 27c59e8 (origin/issue/30, issue/30) fix: 【bug】XXX2
| | | *   ea17250 Merge branch 'release' of host:project_repository into release
| | | |\
| |_|_|/
|/| | |
* | | |   9fd704b Merge branch 'develop' into 'release'
|\ \ \ \
| |/ / /
| * | |   a774d26 Merge branch 'issue/30' into 'develop'
| |\ \ \
| | |/ /
```

接着我就了解到了`git rebase`，变基，哈哈哈。由于对`rebase`了解不深，目前也不敢轻易改用`rebase`，毕竟`rebase`还是有很多隐藏的坑的，使用起来要慎重！在这里先挖个坑吧，后面搞懂了再填坑......

# 注意事项

1. 一般而言，自己发起的`Merge Request`必须由别的同事`Review`并同意合入，这样更有利于发现代码问题。
2. 对了，`TAPD`还支持与`Gitlab`协同的。详情见[源码关联指引](https://www.tapd.cn/help/view#1120003271001001346 '源码关联指引')。

# 结语

实践证明，这套`Git`工作流目前能覆盖我项目开发过程中的绝大部分场景。不过要注意的是，适合自己的才是最好的，盲目采用别人的方案有时候是会水土不服的。

以上所述纯属前端小微团队内部的`Gitlab`实践，必然存在着很多不足之处，如有错误之处还请指正，欢迎交流。

![公众号-前端司南](http://qncdn.wbjiang.cn/%E5%89%8D%E7%AB%AF%E5%8F%B8%E5%8D%97%E5%90%8D%E7%89%87%E5%B8%A6%E5%BE%AE%E4%BF%A1.png)