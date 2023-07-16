---
title: You Can Add Spacers in macOS Dock
pubDate: 2023-06-09T22:00:00.000Z
category: "\U0001F4BB Tech"
image: ""
draft: false
---

Today, I've learned that you can add spacers to the macOS Dock, thanks to [Chris Pennington's 2021 blog post](https://chrispennington.blog/blog/add-spacer-in-macos-dock/). There are small and medium-sized spacers; I preferred the small ones as they look a bit nicer for my setup.

![](</media/Screenshot 2023-06-10 at 11.53.19.png> "macOS Dock with Spacers")

Here's how you do it:

### 1. Open terminal

Open the terminal of your choice to run the script below.

### 2. Run preferred script

Small spacer:

```shell
defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="small-spacer-tile";}'; killall Dock
```

Regular spacer:

```shell
defaults write com.apple.dock persistent-apps -array-add '{"tile-type"="spacer-tile";}'; killall Dock

```

You can interact with added spacers the same way you interact with icons. You can move them by dragging or remove them as well. The spacers really help me organize my dock a bit better, and I'm really happy I discovered this feature, although a bit late.

I have a few issues with how the dock in macOS behaves. I was used to the elementaryOS dock where it was always visible until a window covered the dock, at which point it hid with a nice animation. This approach makes a lot of sense since you want to see your dock when there's nothing covering it, but when you're using an application that obscures the dock, the dock should automatically hide.

It took me quite some time to get used to the macOS dock mechanics and I still keep my dock hidden. It's quite frustrating, but I haven't seen any unofficial way to replicate the elementaryOS dock's behavior in macOS. Regardless, adding spacers contributes to dock organization and enhances the overall experience.
