---
title: "Qubes OS 4.3: Sway in dom0 Without Losing Your Mind"
date: 2026-03-15
tags: [qubes, sway]
description: "Switching from i3 to Sway in Qubes dom0 sounds straightforward until the Wayland compositor has opinions about how qubes should render their windows."
---

Switching from i3 to Sway in Qubes dom0 sounds straightforward until you realise
the Wayland compositor has opinions about how qubes should render their windows.
Here's the approach that worked after three false starts.

The key insight is that `qubes-gui-daemon` needs to know about your Wayland socket
before any domU windows can appear. This means your Sway config needs a few lines
that wouldn't make sense anywhere else:

```
# ~/.config/sway/config.d/qubes.conf
exec --no-startup-id /usr/bin/qubes-gui-daemon
for_window [app_id="qubes-*"] border pixel 2
assign [app_id="qubes-work-*"] workspace 3
assign [app_id="qubes-personal-*"] workspace 4
```

The rest is mostly muscle memory if you've been running i3. The keybindings
translate one-to-one, `swaymsg` replaces `i3-msg`, and your statusbar config
just works.
