---
title: How Web Pages Vaguely Work
tags: ['bug-notes']
---

This is vaguely how web pages work.


When you're in your browser, type in a URL (say, `google.com`), and hit Enter...

1. Your browser asks `google.com`, "Can I please have your web page?"
2. `http://google.com` is willing to answer this question, and responds with *some stuff*
3. Your browser takes this *stuff*, figures out how to put it on the page for you, and puts it there

That's...extremely vague (as promised), so lets go through each step and get into more detail

## Your browser asks `google.com`, "Can I please have your web page?"

Before we can figure out how one computer (your computer) asks another computer (Google's billion dollar server farm in some desert) for a web page, we have to figure out how a computer asks another for...anything.

Computers don't (or at least, don't easily), understand unstructured data. For instance some data like
```
"pretty please give me your web page"
```

That makes sense to a human who can take those words and make a best guess at what the other person is trying to ask, but computers need something much more predictable. The two computers need to agree upon some sort of format for the messages they send each other, and in the case of the messages sent between a browser and a web page server, that format is called `HTTP`.

Go open up your browser (I'll be using Chrome), and then open the developer tools (usually CMD/CTRL+ALT+i, or right-click and "Inspect Element"), and open the "Network" tab. Then browse to `google.com`. You should see a list of requests in the developer tools, and examining the first one (to `google.com`) should show something like

![](/web_pages_1.png)

The imporant part for now is those first two items, `Request URL` and `Request Method`. These are two main components of an HTTP request.

`Request URL` is the location of the thing we're making a request to. It's comprised of a few different parts

- `https://` - This is the 'protocol' that we want to use to talk to the server we're making the request to. You'll notice that we didn't actually type this into the address bar, the browser will just assume the `http[s]` protocol if you don't specify one.
- `www.google.com` - This is the 'domain name'. It's what identifies the server that we want to talk to. You'll notice here that it's `www.google.com` instead of `google.com`. A lot of websites will redirect your requests to `x.com` to `www.x.com` automatically. Some will, some won't, but for now just consider them to be the same thing.
- `/` - This is called the 'path'. Where as the 'domain' identifies the server we want to talk to, the 'path' identifies the specific thing on that server that we want. It's up to the server to take this path and use it to send the right stuff back to the requestor. In this case, we want `/`, often referred to as the 'root' path.

`Request Method` is the action we are requesting the server perform. This can be a bunch of different things, but a few notable examples are

- `GET` - Usually used for "getting" something. Example: `GET google.com/` we want to get the `google.com/` webpage. This is the method that is used for the request made via entering something into your browser address bar.
- `POST` - Usually used for "creating" something. Example `POST facebook.com/users` we want to create a Facebook user.
- `PUT` - Usually used for "updating" something. Example `PUT facebook.com/users/weston` we want to update the `weston` Facebook user.

There are other things that go into creating an HTTP request, but `URL` and `Method` are the two big ones that we care about right now.

## `google.com` is willing to answer this question, and responds with *some stuff*

So now `google.com` has our request of

```
Method: GET
Path: /
```

The `google.com` servers then figure out how to reply to this message, and send back a response. Heading back to the network call in the browser developer tools, we can examine this response. Like the request, there are 2 main pieces to take a look at to get the general overview of the response, `Status Code` and the `Response Body`.

 You can see the `Status Code` in the previous screenshot, `200`. A status code is a 3-digit number, all between `200` and `511`, that identifies the status of the request. There are a ton of these, but a few important ones are...

- `200 OK` - `200` indicates that the request went...OK. Everything went according to plan.
- `401 Unauthorizd`- `401` indicates that you lack the proper authentication to make that request. For example, a `GET chase.com/accounts/your-account` without any login credentials attached should return 401.
- `403 Forbidden` - `403` indicates that the server knows you, but you are not allowed to make that request. Unlike `401`, where the server doesn't now who you are so it denies you access, `403` means that it does know you, but you're still not allowed to make the request. For example a `GET chase.com/accounts/someone-not-you` with valid login credentials attached would return a `403`, since you are logged in, but you're trying to access someone else's account.
- `404 Not Found` - `404` indicates that the request you are trying to make just isn't a thing. It can't find the resources need to fulfill your request. For example `GET google.com/asl8ewoanbasd` or some other random garbage. `google.com` doesn't know what to do with that path, so it `404`s.
- `500 Internal Server Error` - `500` means that something has gone wrong with the server, so your request can not be fulfilled. It doesn't necessarily mean that you request was valid, but it very well could have been. If you get a `500` it likely means there's nothing you can do at the moment to fix it, so you'll just have to try later.

In our case, our `GET google.com/` request got a `200`, everything went fine.

Now for the `Response Body`, let's head to the "Response" pane in the developer tools network tab. You should see something similar to

<img src="/web_pages_2.png" width="100%"/>

Spooky. This is the response body, and it looks scary, but we'll get into that in a second.

There's one more part of the HTTP response I want to call out now, the `Content-Type` header. Head back to the "Headers" tab in the developer tools network pane, the one we were on originally, and scroll down a bit. You should see something like

<img src="/web_pages_3.png" width="100%"/>

`Headers` are additional bits of information you can send along with an HTTP request or response. The original request we sent had headers too, just none that we care about for this discussion. The one we care about here is `content-type`. This header defines the type of data being sent back in the response. That way, the browser knows what to do with the data. This is what allows you to click on a PDF file on a website, and Chrome magically opens it up for you in a PDF viewer. The browser sends a request for `GET someWebsite/somePdf.pdf`, which then sends a response with a header of `Content-Type: text/pdf` (or whatever the correct PDF content-type is).


## Your browser takes this *stuff*, figures out how to put it on the page for you, and puts it there

When requesting `google.com`, the `Content-Type` we get back is `text/html`.

The important part is that it is returning data in the `HTML` format. An extremely simplified example of what the `google.com` HTML might look like is...

```html
<html>
<head>
</head>
<body>
    <h1> Google </h1>
    <form>
        <input />
        <button>Google Search</button>
    </form>
</body>
</html>
```

The `HTML` document defines the structure of the web page. We have a header (`h1`) that says "Google", and a form that contains an input for typing in your search query (`input`) and a button (`button`) for submitting your search. Our browser knows how to take the HTML and turn it into a UI on our screen that we can interact with. As you can tell from that scary blob of text in the previous screenshot, there is *a lot* more that can go into creating a webpage than that sample HTML, but the general concept is the same. The server sends some `HTML` that tells the browser how to run the page, and the browser runs it.




:)

