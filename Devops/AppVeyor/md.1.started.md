travis-ci对dotnet的项目做自动化集成不太友好，尤其是使用mono的编译和不能使用MSTest进行自动化测试，所以转到appveyor进行。

appveyor的配置非常简单，有两种方式：

一、全部使用appveyor的后台进行，不需要配置一个yml文件，之后自动下载yml文件上传到项目，或者省略这部，手动点击build。

二、手动编写yml文件，然后结合后台进行，自由度比较高。

主要做法：

1、关联github账号

2、添加github上的项目

3、编写yml项目，只需要置顶.sln文件

4、提交代码，自动编译和测试（如果没指定测试项目，会自动检测Test项目）

5、如果有一条龙的要发布到NuGet的官网，那么自定配置脚本进行

参考地址：

配置文件检测工具：https://ci.appveyor.com/tools/validate-yaml

参考配置文档教程：https://www.appveyor.com/docs/