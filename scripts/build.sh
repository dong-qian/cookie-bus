#!/bin/bash

build() {
    echo 'building cookie-bus'

    rm -rf release/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p release/cookie-bus
    cp -r build/* release/cookie-bus

    mv release/cookie-bus/index.html release/cookie-bus/popup.html
}

build