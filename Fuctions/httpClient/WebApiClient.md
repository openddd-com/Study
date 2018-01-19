# 库简介
WebApiClient是开源在github上的一个httpClient客户端库，内部基于HttpClient开发，是一个只需要定义c#接口(interface)，并打上相关特性，即可异步调用http-api的框架 ，支持.net framework4.5+、netcoreapp2.0和netstandard2.0。

本文将详细地讲解如何使用WebApiClient进行http接口的调用，给.net开发者提供一种有别于传统的http接口调用编程方式。

## 1. 设计一个Get请求接口
### 1.1 最简单的Get请求
```java
    public interface MyWebApi : IDisposable{    
        // GET http://www.mywebapi.com/webapi/user?account=laojiu
        [HttpGet("http://www.mywebapi.com/webapi/user")]   
        ITask<string> GetUserByAccountAsync(string account);
    }
    var myWebApi = HttpApiClient.Create<MyWebApi>();
    var userStr = await myWebApi.GetUserByAccountAsync("laojiu");
    myWebApi.Dispose();
```
### 1.2 使用[HttpHost]特性

如果你有多个接口，而且都指向对一服务器，可以将请求的域名抽出来放到HttpHost特性，接口的代码如下：
```java
[HttpHost("http://www.mywebapi.com")]
public interface MyWebApi : IDisposable{    
// GET /webapi/user?account=laojiu
    [HttpGet("/webapi/user")]    
    ITask<string> GetUserByAccountAsync(string account);
}
```
### 1.3 使用强类型返回值处理xml或json

如果接口的返回内容是xml或json，你希望将它自动映射为强类型的模型，需要给接口打上对应的[XmlReturn]或[JsonResult]。实际上有一个[AutoReturn]，它会根据回复头标识，自动选择不同的转换器转换为TResult类型的结果，默认的，每个接口都使用了[AutoReturn]，除非给接口显性地给方法配置了[XmlReturn]或[JsonResult]。如果以上返回的userStr是UserInfo类型的xml或json文本，那么强类型的代码声明如下：
```java
[HttpHost("http://www.mywebapi.com")]
public interface MyWebApi : IDisposable{    
// GET /webapi/user?account=laojiu
    [HttpGet("/webapi/user")]    
    ITask<UserInfo> GetUserByAccountAsync(string account);
}

[HttpHost("http://www.mywebapi.com")]
[JsonReturn] // 指明使用Json处理返回值为UserInfo类型
public interface MyWebApi : IDisposable{  
  // GET /webapi/user?account=laojiu
    [HttpGet("/webapi/user")]    
    ITask<UserInfo> GetUserByAccountAsync(string account);
}
```
## 2.请求URL的多个参数
### 2.1 参数平铺

你可以将多个参数一一设计为接口的参数，类似于：
```java
// GET /webapi/user?account=laojiu&password=123456[HttpGet("/webapi/user")]ITask<UserInfo> GetUserAsync(string account, string password);
```
### 2.2 参数合并到模型

也可以将所有参数合到一个简单的多属性模型对象：
```java
public class MyParameters{   
  public string Account { get; set; }   
  public string Password { get; set; }         
}
// GET /webapi/user?account=laojiu&password=123456
[HttpGet("/webapi/user")]
ITask<UserInfo> GetUserAsync(MyParameters parameters);
```
### 2.3 模型+简单参数混合

在一些场景中，除了提交多属性模型对象之外，可能还需要一个简单类型的额外参数，你可以如下编写接口:
```java
// GET /webapi/user?account=laojiu&password=123456&birthDay=2010-01-01 01:01:01
[HttpGet("/webapi/user")]
ITask<UserInfo> GetUserAsync(MyParameters parameters，DateTime birthDay);
```
上面这里，你可能会遇到一个问题，birthDay会简单的ToString()值做为参数值，如果你希望只需要日期而不包含时间，你可以给birthDay指定格式：
```java
// GET /webapi/user?account=laojiu&password=123456&birthDay=2010-01-01
    [HttpGet("/webapi/user")]
    ITask<UserInfo> GetUserAsync(
        MyParameters parameters，
        [PathQuery("yyyy-MM-dd")] DateTime birthDay);
```
实际上，对于没有任何特性修饰的每个参数，都默认被[PathQuery]修饰，表示做为请求路径或请求参数处理，[PathQuery]的构造器重载方法可以指定日期时间格式。

3.设计一个Post请求接口
3.1使用x-www-form-urlencoded提交请求
```java
// POST webapi/user  // Body Account=laojiu&Password=123456
[HttpPost("/webapi/user")]
ITask<UserInfo> UpdateUserWithFormAsync([FormContent] UserInfo user);
```
设计风格和Get请求是差不多的，你应该发现，接口参数被[FormContent]修饰了，[FormContent]的作用是将模型参数user以key1=value1&key2=value2的方式写入到请求内容中。如果你还需要提供一个额外的简单类型参数，需要使用[FormField]修饰这个参数，可以这样设计接口：
```java
// POST webapi/user  
// Body Account=laojiu&Password=123456&fieldX=xxx
    [HttpPost("/webapi/user")]
    ITask<UserInfo> UpdateUserWithFormAsync(
    [FormContent] UserInfo user, 
    [FormField] string fieldX);
```
3.2使用multipart/form-data提交请求
```java
    // POST webapi/user  
    [HttpPost("/webapi/user")]
    ITask<UserInfo> UpdateUserWithMulitpartAsync([MulitpartContent] UserInfo user);
    // POST webapi/user 
    [HttpPost("/webapi/user")]
    ITask<UserInfo> UpdateUserWithMulitpartAsync(
    [MulitpartContent] UserInfo user, 
    [MulitpartText] string nickName,
    MulitpartFile file);
```
需要了解的是，[MulitpartText]表示是一个文本项，而MulitpartFile表示一个文件项，MulitpartFile实现了IApiParameterable接口，它不需要任何特性的修饰，它能提供自我解释和处理。

### 3.3提交Json或Xml文本

对于json和xml，只能一次性提交一个参数，不支持额外参数之说
```java
// POST webapi/user  
// Body user的json文本
[HttpPost("/webapi/user")]
ITask<UserInfo> UpdateUserWithJsonAsync([JsonContent] UserInfo user);// POST webapi/user  
// Body user的xml文本
[HttpPost("/webapi/user")]
ITask<UserInfo> UpdateUserWithXmlAsync([XmlContent] UserInfo user);
```
如果你的UserInfo有DateTime类型的属性，你可以使用[JsonContent("时间格式")]来修饰接口参数，否则时间格式使用HttpApiConfig的DateTimeFormate。

### 3.4 提交原始的HttpContent
```java
// POST webapi/user 
// Body Account=laojiu&Password=123456
[HttpPost("/webapi/user")]
ITask<UserInfo> UpdateUserWithFormAsync(FormUrlEncodedContent user);
// POST webapi/user  
// Body Account=laojiu&Password=123456&age=18
[HttpPost("/webapi/user")]ITask<UserInfo> UpdateUserWithFormAsync(
    [HttpContent] FormUrlEncodedContent user,
    [FormField] int age);
```
默认的，所有System.Net.Http.HttpContent类型的参数，都会被[HttpContent]特性修饰，而且可以与表单字段特性等混合使用。值得说明的话，传统的System.Net.Http.HttpContent类型参数必须放到其它表单字段参数的前面。

## 4. 动态指定请求的域名或Url
### 4.1 域名动态而相对路径固定

以上的例子，请求的根路径都是硬编码，而在不少场景中是放在配置文件中的，可以在创建接口实例时创建配置项：
```java
var config = new HttpApiConfig
{    // 请求的域名，会覆盖[HttpHost]特性
    HttpHost = new Uri("http://www.webapiclient.com"),
};
var myWebApi = HttpApiClient.Create<MyWebApi>(config);var userStr = await myWebApi.GetUserByAccountAsync("laojiu");
myWebApi.Dispose();
```
### 4.2 每个请求接口的URL路径都是动态的

有时，多个接口方法的全部URL都是运行时才确定的，这时，需要给每个接口做如下的调整，注意[Url]特性表示参数是请求的URL，要求必须放在第一个参数。：
```java
public interface MyWebApi : IDisposable{    // GET {URL}?account=laojiu
    [HttpGet]    
    ITask<string> GetUserByAccountAsync([Url] string url, string account);
}
```
### 4.3 相对路径某个分段动态

有时，有些接口会将某个参数做路径的一个分段，比如GET http://www.webapiclient.com/{account}，这里的{account}是动态的，获取哪个账号的资料就填写哪个账号，可以如下设计接口
```java
public interface MyWebApi : IDisposable{    // GET http://www.webapiclient.com/laojiu
    [HttpGet("http://www.webapiclient.com/{account}"]    ITask<string> GetUserByAccountAsync(string account);
}
```
## 5.参数别名或属性别名
### 5.1 参数别名

有些服务端接口要求的键名与你的编程风格不一致，或者使用了特殊的键名为.net语言不允许的参数名，你可以使用[AliasAs("name")]来给参数或模型的属性别名。
```java
public interface MyWebApi : IDisposable{   
 // GET http://www.mywebapi.com/webapi/user?_name=laojiu
    [HttpGet("http://www.mywebapi.com/webapi/user")]   
    ITask<string> GetUserByAccountAsync(
        [AliasAs("_name")] string account);
}
```
### 5.2 模型的属性别名
```java
public class UserInfo{
    [AliasAs("loginAccount")]   
    public string Account { get; set; }  
    public string Password { get; set; }
}
```
## 6.特性的范围和优先级
### 6.1 特性的范围

有些特性比如[Header]，可以修饰于接口、方法和参数，使用不同的构造器和修饰于不同的地方产生的含义和结果是有点差别的：

- 修饰接口时，表示接口下的所有方法在请求前都会添加这个请求头；
- 修饰方法时，表示此方法在语法前添加这个请求头；
- 修饰参数时，表示参数的值将做为请求头的值，由调用者动态传入；

### 6.2 特性的优先级

有些特性比如[AutoReturn]和[JsonReturn]，可以修饰于接口和方法，但特性的AllowMultiple为false，如果在接口级生明方法级[AutoReturn],在方法级上声明[JsonReturn]，此方法实际生效的是[JsonReturn]；再比如[Timeout]特性，如果在接口级声明[Timeout(5000)]在方法级声明[Timeout(10000)]，实际生效的是[Timeout(10000)]，总结如下：

- AllowMultiple为false的同一个特性，方法级比接口级优先级高
- AllowMultiple为false的不同类型的[ReturnAttribute]，方法级比接口级优先级高