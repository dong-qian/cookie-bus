#!/bin/bash

build() {
    echo 'building cookie-bus'

    rm -rf release/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    path="cookie-bus-1.0.5"

    mkdir -p release/$path
    cp -r build/* release/$path

    mv release/$path/index.html release/$path/popup.html
}

build