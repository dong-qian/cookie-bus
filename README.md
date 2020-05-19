[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/qiandongyq/cookie-bus">
    <img src="public/icon-128.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Cookie Bus</h3>

  <p align="center">
    Import Cookies from any tab!
    <br />
    <a href="https://github.com/qiandongyq/cookie-bus"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/qiandongyq/cookie-bus/issues">Report Bug</a>
    ·
    <a href="https://github.com/qiandongyq/cookie-bus/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Screenshots](#screenshots)
  - [Built With](#built-with)
- [Demo](#demo)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

**💻 Cookie Bus is an extremely simple `One Click 👍` web extension to help developer imports cookies from one tab to the current tab**

### Screenshots

One click import

![Product Screen Shot 1][product-screenshot1]

Change profile

![Product Screen Shot 3][product-screenshot3]

Create or update profile

![Product Screen Shot 2][product-screenshot2]

### Built With

- [React](https://reactjs.org/)
- [Tailwindcss](https://tailwindcss.com/)
- [Chrome Api](https://developer.chrome.com/extensions/api_index)
- [Google fonts](https://fonts.google.com/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)

<!-- Demo -->

## Demo

**WIP**

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/qiandongyq/cookie-bus
```

2. Install NPM packages

```sh
npm install
or
yarn install
```

<!-- USAGE EXAMPLES -->

## Usage

**Scripts**

- `yarn start` - build css in watch mode and start webpack dev server
- `yarn build` - builds css in production mode (purgecss unused css), build extension to `/dist` folder

**Load extension in Google Chrome**

In [Google Chrome](https://www.google.com/chrome/), open up [chrome://extensions](chrome://extensions) in a new tab. Make sure the `Developer Mode` checkbox in the upper-right corner is turned on. Click `Load unpacked` and select the `dist` directory in this repository - your extension should now be loaded.

![Installed Extension in Google Chrome](doc/load-extension.jpg "Installed Extension in Google Chrome")

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/qiandongyq/cookie-bus.svg?style=flat-square
[contributors-url]: https://github.com/qiandongyq/cookie-bus/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/qiandongyq/cookie-bus.svg?style=flat-square
[forks-url]: https://github.com/qiandongyq/cookie-bus/network/members
[stars-shield]: https://img.shields.io/github/stars/qiandongyq/cookie-bus.svg?style=flat-square
[stars-url]: https://github.com/qiandongyq/cookie-bus/stargazers
[issues-shield]: https://img.shields.io/github/issues/qiandongyq/cookie-bus.svg?style=flat-square
[issues-url]: https://github.com/qiandongyq/cookie-bus/issues
[license-shield]: https://img.shields.io/github/license/qiandongyq/cookie-bus.svg?style=flat-square
[license-url]: https://github.com/qiandongyq/cookie-bus/blob/master/LICENSE.txt
[product-screenshot1]: doc/extension-1.jpg
[product-screenshot2]: doc/extension-2.jpg
[product-screenshot3]: doc/extension-3.jpg
