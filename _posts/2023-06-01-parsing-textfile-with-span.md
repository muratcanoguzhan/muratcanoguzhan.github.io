---
layout: post
title: Parsing Text File By Span and Memory
tags: [c#, dotnet, span]
---

# Parsing Text File By Span and Memory
It has been a long time since Span and Memory joined our world, but I recently had a chance to look at them. If you want to use them you should have at least .Net Core 2.1. If you want to get detailed information you can look at https://docs.microsoft.com/en-us/archive/msdn-magazine/2018/january/csharp-all-about-span-exploring-a-new-net-mainstay
So what are we going to do here is we will implement a solution to parsing text files. The first one will be implemented by classic .Net codes and the second one will be implemented by Span and Memory.
We will write a method and the method will read all of the text inside the file then it will count the occurrences of the words. Like a word how many times used in the text.

For example, we have a text file like this;

<script src="https://gist.github.com/muratcanoguzhan/23a077d1c5d2f02674bb7765f69d4cc0.js"></script>

And the result should be;

<script src="https://gist.github.com/muratcanoguzhan/85c3af0680d31779027e8098671a2e03.js"></script>

So let's start to write our project;

In order to implement multiple parsers, we need one interface to return pairs.

<script src="https://gist.github.com/muratcanoguzhan/2d993ea9cb2ef842d9445b20b5cdfe41.js"></script>

Our classic Parser;

Because StreamReader has the ReadLine method we will use it. Then we count if there is an occurrence.

<script src="https://gist.github.com/muratcanoguzhan/d46d743a4e7d5fe1bb3a19ea74cbb9b9.js"></script>

And the second one is here. Here I tried to write code to do the same thing with our classic example. Because there is no ReadLine method that implements Memory buffer I wrote something as if it is ReadLine.

<script src="https://gist.github.com/muratcanoguzhan/d1a03a982d9239e36f6d271637d0f240.js"></script>

As you can see above we have Memory<char> and we read text file char by char until it is a new line then we create a string by our read chars. Then we do the same thing as we do in our classic example. If we had a split method like Span<string> char[].Span that would be awesome too.

So let's see what their effects are on files.

<script src="https://gist.github.com/muratcanoguzhan/7d8fcccb85eb6c168129fead9ba1a74f.js"></script>

After injecting the list of IFileParser we watched them on a higher than 50MB text file and the result is an average of 7 seconds with MemoryParser.

![Crepe](../assets/img/spanparser1.png){: .mx-auto.d-block :}

Also, if you look at diagnostic tools you can see that CPU usage is less than the classic one.
If you try on a file larger than 450MB you can see below that it takes %50 shorter than the classic one. And these results are not got on the released version they get on the debug version.

![Crepe](../assets/img/spanparser2.png){: .mx-auto.d-block :}

Note: If there is any problem with my codes don't hesitate to comment about it.