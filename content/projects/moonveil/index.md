+++
title = "Moonveil"
date = 2024-01-01
weight = 1
description = "an extremely customizable and Usability Dots." 
path = "/moonveil"

[taxonomies]
tags = ["linux", "hyprland", "dotfiles", "web"]

[extra]
no_header = true
hide_banner = true
hide_site_title = true
accent_color = "hsl(215, 100%, 67%)"

[extra.meta]
favicon = "moonveil-logo.png"

[extra.nav]
links = [
    { name = "Links", category = [
    { url = "https://github.com/notcandy001/Moonveil", name = "GitHub", icon = "github-logo" },
    ] },
]

+++

<div align="center" style="margin: 2rem 0 1.5rem 0; background: transparent;">
  <img src="moonveil-logo.png" alt="Moonveil Logo" class="transparent drop-shadow no-hover" style="max-width: 400px; width: 100%; background: transparent !important;" />
    <div align="center">

<mark>A ***Ex**tremely* customizable and Usability dots.</mark>

</div>
</div>


{{ carousel(start=1, end=5, interval=3000, style="margin: -2rem 0 -2rem 0") }}

<div align="center" style="position: relative; margin-top: 4rem; margin-bottom: 4rem;">
  <div class="desktop-only" style="position: absolute; right: calc(50% + 90px); top: 10px; width: max-content;">
    {{ arrow_note(text="Check the dotfiles!", target="github-btn", color="text", font_size="1.25rem", stroke_width="2", head_size="10", amplitude="50", ease_out="20", ease_in="-20", start_dir="bottom", end_dir="bottom") }}
  </div>

  {{ styled_button(id="github-btn", image="/social-icons/16x/github_icon_bg.png", link="https://github.com/notcandy001/Moonveil", width="32px", effect="zoom rotate", rotate="-15") }}
</div>

## Installation

{% crt() %}
curl -L get.roderic.me/moonveil | sh
{% end %}

## Features 
- [x] Matugen powered dynamic colors 
- [x] **CrescentShell**  
- [x] Floating notch
- [x] Cava music visualizer in the notch
- [x] Barcode lockscreen 
- [x] Power profile switcher
- [x] Wallpaper manager 
- [x] App launcher and workspace overview
- [x] Notification center
- [x] Control center with quick toggles
- [x] Media controls
- [x] Volume and brightness sliders
- [x] Screenshot and screen region capture
- [x] Calendar and todo widget
- [x] Smooth animations throughout
- [x] Customizable keybindings
- [ ] Clipboard manager
- [ ] Emoji picker
- [ ] Dashboard widget


## About

Moonveil is a calm Hyprland dotfiles setup built for real workflow. Every detail tuned by hand from keybindings and theming to compositor behavior and window rules. Built not just to look good, but to deeply understand every layer of the configuration.

Moonveil Web is the companion documentation and showcase site, giving Moonveil a proper home on the web with guides, screenshots, and setup instructions.

## Contributing

Contributions are welcome!
Bug reports, suggestions, and feature contributions are encouraged.  
Feel free to open an issue or submit a pull request. [GitHub](https://github.com/notcandy001/Moonveil).
