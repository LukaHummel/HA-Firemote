import {css, unsafeCSS} from './lit/lit-all.min.js';
import {launcherCSS} from './launcher-buttons.js?version=v4.1.9';

export const remoteStyles = css`
          :host {
            display: block;
          }

          .viewport-scale-frame {
            box-sizing: content-box;
            display: flex;
            width: 100%;
          }

          .viewport-scale-container {
            flex-shrink: 0;
            position: relative;
            margin: auto;
            overflow: clip;
          }

          .viewport-scale-content {
            position: absolute;
            top: 0;
            left: 0;
            width: max-content;
            transform-origin: top left;
          }


          ha-card {
            background: rgba(30,30,30,0);
            display: grid;
            justify-content: center;
            padding: 0;
            margin: auto;
            box-shadow: none;
            border: 0;
            outline: 0;
            isolation: isolate;
            direction: ltr;
            -webkit-tap-highlight-color: rgb(0 0 0 / 0%);
          }

          .hidden {
            display: none !important;
          }

          .mdiSubstituteIconWrapper {
            pointer-events: none;
            transform: scale(var(--sz));
          }

          .mdiSubstitueIcon {
            display: var(--ha-icon-display,inline-flex);
            align-items: center;
            justify-content: center;
            position: relative;
            vertical-align: middle;
            fill: var(--icon-primary-color,currentcolor);
            width: var(--mdc-icon-size,24px);
            height: var(--mdc-icon-size,24px);
          }

          .shield-remote-body {
            background: linear-gradient(90deg, rgba(22,21,21,1) 0%, rgba(37,37,37,1) 10%, rgba(37,37,37,1) 90%, rgba(22,21,21,1) 100%);
            border: solid #252525 calc(var(--sz) * 0.14rem);
            padding: calc(var(--sz) * 1.428rem) calc(var(--sz) * 0.714rem) calc(var(--sz) * 2.143rem) calc(var(--sz) * 0.714rem);
            display: grid;
            justify-items: center;
            align-content: flex-start;
            grid-column-gap: calc(var(--sz) * 1.2rem);
            grid-row-gap: calc(var(--sz) * 0.5rem);
            grid-template-columns: 1fr 1fr;
            width: calc(var(--sz) * 8.286rem);
            min-height: calc(var(--sz) * 45rem);
          }

          .shield-remote-body.ns1-body {
            background: linear-gradient(90deg, rgb(28 28 28) 0%, rgb(37, 37, 37) 8%, rgb(40 40 40) 50%, rgb(37, 37, 37) 92%, rgb(28, 28, 28) 100%);
            border: solid #1c1c1c calc(var(--sz) * 0.14rem);
            border-radius: calc(var(--sz) * 1.2rem);
          }

          .roku-remote-body {
            display: flex;
            flex-direction: column;
            align-content: center;
            justify-content: flex-start;
            align-items: center;
            gap: calc(var(--sz) * 1rem);
            background: linear-gradient(90deg, rgba(42,42,42,1) 0%, rgba(58,58,58,1) 50%, rgba(42,42,42,1) 100%);
            border-radius: calc(var(--sz) * 3.25rem);
            border: solid #252525 calc(var(--sz) * 0.6rem);
            border-top: solid #292929 calc(var(--sz) * 0.6rem);
            width: calc(var(--sz) * 11.287rem);
            padding: calc(var(--sz) * 0.35rem);
            padding-bottom: calc(var(--sz) * 1.12rem);
            min-height: calc(var(--sz) * 44rem);
          }

          .roku-remote-body:has(div.rokuTag) {
            margin-bottom: calc(var(--sz) * 2rem);
          }

          .roku-remote-body ha-icon {
            transform: scale(calc(var(--sz) * .8));
          }

          .roku-remote-body > div {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: row;
            align-content: center;
            justify-content: center;
            align-items: center;
            gap: calc(var(--sz) * 0.35rem);
          }

          .roku-remote-body > div:not(.rokuDPadContainer) > button:active {
            box-shadow: none !important;
            transform: scale(0.975);
            transform-origin: center bottom;
          }

          .roku-remote-body > div:not(.rokuDPadContainer) > button:active > ha-icon {
            transform: scale(0.8);
          }

          .roku-remote-body.RVR > div.powerRow {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            align-items: center;
            justify-items: center;
            margin-bottom: calc(var(--sz) * 1rem);
          }

          .roku-remote-body.RTR {
              border-radius: calc(var(--sz) * 6rem);
              padding: calc(var(--sz) * 1rem);
          }

          .roku-remote-body.RWR > div.powerRow,
          .roku-remote-body.RTR > div.powerRow,
          .roku-remote-body.RHR > div.powerRow {
            margin-bottom: calc(var(--sz) * 1.25rem);
          }

          .roku-remote-body > div.micRow {
            height: calc(var(--sz) * 0.4rem);
            aspect-ratio: 1;
            background: black;
            border-radius: 100%;
            margin-top: calc(var(--sz) * 0.4rem);
          }

          .roku-remote-body.RVR div.micRow {
            height: calc(var(--sz) * 0.4rem);
            aspect-ratio: 1;
            background: black;
            border-radius: 100%;
          }

          .roku-remote-body.RSR > div.backHomeRow {
            padding-top: calc(var(--sz) * 5rem);
          }

          .roku-remote-body > div.backHomeRow > button{
            height: calc(var(--sz) * 2.5rem);
            width: calc(var(--sz) * 5.25rem);
            border: solid #090909 calc(var(--sz) * 0.125rem);
            border-radius: calc(var(--sz) * 0.7rem);
            box-shadow: 0px 5px 2px 0px #0000001a;
          }

          .roku-remote-body > div.rokuDPadContainer {
            background: linear-gradient(175deg, rgb(42 42 42) 0%, rgb(51 51 51) 100%);
            padding: calc(var(--sz) * 0.3rem);
            border-radius: calc(var(--sz) * 1.5rem);
            display: grid;
            grid-template-columns: 31% 38% 31%;
            grid-template-rows: 31% 38% 31%;
            grid-gap: 0;
            width: calc(var(--sz) * 10.15rem);
            height: calc(var(--sz) * 10.15rem);
            overflow: hidden;
          }

          .roku-remote-body.RTR > div.rokuDPadContainer {
            padding: calc(var(--sz) * 0.75rem);
            border-radius: 100%;
          }

          .rokuDPadContainer > button {
            background: #662d91;
            color: rgb(198, 198, 198);
            height: 100%;
            width: 100%;
            margin: 0;
            cursor: pointer;
            line-height: normal;
            user-select: none;
            display: grid;
            place-content: center;
            border: 0;
            aspect ratio: 1;
            font-size: calc(var(--sz) * 1.275rem);
            position: relative;
            z-index: 2;
          }

          .rokuDPadContainer > button > ha-icon {
            transform: scale(calc(var(--sz) * 1.3));
          }

          .rokuDPadContainer > button:active > ha-icon, .rokuDPadContainer > button:active > .okCircle {
            color: #bcbcbc;
            transform: scale(calc(var(--sz) * 0.85));
          }

          .roku-remote-body #up-button {
            transform-origin: bottom center;
            border-radius: calc(var(--sz) * 1rem) calc(var(--sz) * 1rem) 0 0;
            position: relative;
          }

          .roku-remote-body #left-button {
            transform-origin: center right;
            border-radius: calc(var(--sz) * 1rem) 0 0 calc(var(--sz) * 1rem);
            box-shadow: 0px 5px 2px 0px #0000001a;
          }

          .roku-remote-body #right-button {
            border-radius: 0 calc(var(--sz) * 1rem) calc(var(--sz) * 1rem) 0;
            transform-origin: center left;
            box-shadow: 0px 5px 2px 0px #0000001a;
            z-index: 1;
          }

          .roku-remote-body #down-button {
            transform-origin: top center;
            border-radius: 0 0 calc(var(--sz) * 1rem) calc(var(--sz) * 1rem);
            box-shadow: 0px 5px 2px 0px #0000001a;
          }

          .roku-remote-body #center-button {
            z-index: 3;
          }

          .roku-remote-body #up-button::before {
            content: '';
            position: absolute;
            margin: 0;
            padding: 0;
            bottom: 0;
            left: calc(var(--sz) * -1.95rem);
            border-radius: 100%;
            height: calc(var(--sz) * 2rem);
            width: calc(var(--sz) * 2rem);
            background: transparent;
            box-shadow: calc(var(--sz) * 1rem) calc(var(--sz) * 1rem) 0 rgb(102, 45, 145);
          }

          .roku-remote-body #up-button::after {
            content: '';
            position: absolute;
            margin: 0;
            padding: 0;
            bottom: 0;
            right: calc(var(--sz) * -1.95rem);
            border-radius: 100%;
            height: calc(var(--sz) * 2rem);
            width: calc(var(--sz) * 2rem);
            background: transparent;
            box-shadow: calc(var(--sz) * -1rem) calc(var(--sz) * 1rem) 0 rgb(102, 45, 145);
          }

          .roku-remote-body #down-button::before {
            content: '';
            position: absolute;
            margin: 0;
            padding: 0;
            top: 0;
            left: calc(var(--sz) * -1.95rem);
            border-radius: 100%;
            height: calc(var(--sz) * 2rem);
            width: calc(var(--sz) * 2rem);
            background: transparent;
            box-shadow: calc(var(--sz) * 1rem) calc(var(--sz) * -1rem) 0 rgb(102, 45, 145);
          }

          .roku-remote-body #down-button::after {
            content: '';
            position: absolute;
            margin: 0;
            padding: 0;
            top: 0;
            right: calc(var(--sz) * -1.95rem);
            border-radius: 100%;
            height: calc(var(--sz) * 2rem);
            width: calc(var(--sz) * 2rem);
            background: transparent;
            box-shadow: calc(var(--sz) * -1rem) calc(var(--sz) * -1rem) 0 rgb(102, 45, 145);
          }

          .rokuDPadContainer > button:not(#center-button):active {
            box-shadow: unset;
            transform: scale(0.98);
          }

          .okCircle {
            padding: calc(var(--sz) * .75rem);
            border-radius: 100%;
            border: calc(var(--sz) * 0.15rem) solid rgb(88 38 125);
            background: linear-gradient(175deg, rgb(165 165 165 / 20%) 10%, rgb(29 29 29 / 20%) 100%);
            margin: 0;
            place-self: center;
            display: flex;
            place-content: center;
            align-items: center;
            user-select: none;
            pointer-events: none;
            aspect-ratio: 1/1;
            overflow: hidden;
          }

          .rokuDPadContainer > button:active > .okCircle {
            color: #bcbcbc;
            transform: scale(calc(var(--sz) * 0.8));
            filter: brightness(0.9);
          }

          .roku-remote-body > div.replayVoiceOptionsRow,
          .roku-remote-body > div.scrubRow,
          .roku-remote-body > div.personalShortcutsRow {
            width: calc(var(--sz) * 10.15rem);
            display: grid;
            grid-template-columns: 35% 22% 35%;;
            justify-content: center;
            place-content: center space-between;
            place-items: center;
            justify-items: stretch;
            align-items: center;
          }

          .roku-remote-body.RVR > div.replayVoiceOptionsRow {
            grid-template-columns: 25% 38% 25%;
          }

          .roku-remote-body.RSR > div.replayVoiceOptionsRow,
          .roku-remote-body.RTR > div.replayVoiceOptionsRow {
            grid-template-columns: 47% 47%;
          }

          .roku-remote-body > div.replayVoiceOptionsRow button,
          .roku-remote-body > div.scrubRow button,
          .roku-remote-body > div.personalShortcutsRow button {
            height: calc(var(--sz) * 2.25rem);
            width: 100%;
            border: solid #090909 calc(var(--sz) * 0.125rem);
            border-radius: calc(var(--sz) * 0.7rem);
            box-shadow: 0px 5px 2px 0px #0000001a;
          }

          .roku-remote-body > div.scrubRow {
            grid-template-columns: 22% 48% 22%;
          }

          .roku-remote-body.RVR > div.scrubRow,
          .roku-remote-body.RSR > div.scrubRow,
          .roku-remote-body.RWR > div.scrubRow {
            margin-bottom: calc(var(--sz) * 0.75rem);
          }

          .roku-remote-body > div.scrubRow button {
            height: calc(var(--sz) * 3rem);
          }

          .roku-remote-body > div.personalShortcutsRow {
            grid-template-columns: 31% 31%;
            gap: calc(var(--sz) * 1.75rem);
            justify-content: center;
            padding: calc(var(--sz) * 0.3rem) 0 calc(var(--sz) * 0.6rem) 0;
          }

          .roku-remote-body > div.personalShortcutsRow > button > ha-icon {
            transform: scale(var(--sz));
          }

          .roku-remote-body .appLauncherAppsContainer {
            display: grid;
            grid-template-columns: 50% 50%;
            grid-row-gap: calc(var(--sz) * 1rem);
            align-items: center;
            justify-items: center;
            justify-content: center;
            align-content: center;
          }

          .roku-remote-body.RHR .appLauncherAppsContainer {
            padding: calc(var(--sz) * 1rem) 0 calc(var(--sz) * 4rem) 0;
          }

          .roku-remote-body.RWR .appLauncherAppsContainer {
            padding-bottom: calc(var(--sz) * 6rem);
          }

          .roku-remote-body .appLauncherAppsContainer > button {
            height: calc(var(--sz) * 1.8rem);
            width: calc(var(--sz) * 5.1426rem);
            border-radius: calc(var(--sz) * 0.7rem);
            box-sizing: border-box;
            align-items: center;
          }

          .roku-remote-body .appLauncherVerticalAppsContainer {
            display: grid;
            margin-top: calc(var(--sz) * 1.25rem);
            gap: calc(var(--sz) * 1rem);
          }

          .rokuBrandLogo {
            padding: calc(var(--sz) * 1rem) 0;
          }

          .RHR .rokuBrandLogo,
          .RWR .rokuBrandLogo {
            position: absolute;
            bottom: calc(var(--sz) * 2rem);
          }

          .RTR .rokuBrandLogo {
            padding: calc(var(--sz) * 1rem) 0 calc(var(--sz) * 2.25rem) 0;
          }

          .rokuBrandLogo svg {
            height: calc(var(--sz) * 1.15rem);
            max-width: calc(var(--sz) * 11.287rem);
          }

          .RHR .rokuBrandLogo svg {
            height: calc(var(--sz) * 0.8rem);
          }

          .RWR .rokuBrandLogo svg {
            height: calc(var(--sz) * 3.1rem);
          }

          .roku-remote-body .rokuTag {
            position: absolute;
            height: calc(var(--sz) * 2.2rem);
            width: calc(var(--sz) * 5.6rem);
            background: repeating-linear-gradient(#662D91, #662D91 calc(var(--sz) * 0.15rem), #3b1955 calc(var(--sz) * 0.15rem), #3b1955 calc(var(--sz) * 0.3rem));
            bottom: 0;
            overflow: hidden;
            box-sizing: border-box;
            padding: calc(var(--sz) * 1.1rem);
            border: solid #662d91 calc(var(--sz) * 0.1rem);
            border-top: none;
            border-bottom: none;
            -webkit-clip-path: polygon(7% 5%, 93% 5%, 100% 0, 100% 100%, 0 100%, 0 0);
            clip-path: polygon(7% 5%, 93% 5%, 100% 0, 100% 100%, 0 100%, 0 0);
          }

          .chromecast-remote-body {
            background: #ebebea;
            border-radius: calc(var(--sz) * 6rem);
            border: solid #cfcfcf calc(var(--sz) * 0.1rem);
            width: calc(var(--sz) * 11.287rem);
            padding: calc(var(--sz) * 0.35rem);
            padding-bottom: calc(var(--sz) * 4rem);
            display: grid;
            justify-items: center;
            align-content: flex-start;
            grid-column-gap: calc(var(--sz) * 1.2rem);
            grid-row-gap: calc(var(--sz) * 0.6rem);
            grid-template-columns: 1fr 1fr;
            min-height: calc(var(--sz) * 37rem);
          }

          .chromecast-remote-body.CC2 {
            background: #cad4d8;
          }

          .chromecast-remote-body.CC3 {
            background: #e1d2cc;
          }

          .apple-remote-body {
            background: #b5b5b5;
            background: linear-gradient(0deg, rgba(147,148,150,1) 0%, rgba(207,211,213,1) 100%);
            border: solid #d1d1d1 calc(var(--sz) * 0.05rem);
            border-radius: calc(var(--sz) * 1.75rem);
            display: grid;
            justify-items: center;
            align-content: flex-start;
            grid-column-gap: calc(var(--sz) * 1rem);
            grid-row-gap: calc(var(--sz) * 0.5rem);
            grid-template-columns: 1fr 1fr;
            width: calc(var(--sz) * 13rem);
            min-height: calc(var(--sz) * 51rem);
            padding-bottom: calc(var(--sz) * 1.5rem);
          }

          .apple-remote-body.AR1 {
            padding-top: calc(var(--sz) * 4.75rem);
            min-height: calc(var(--sz) * 47rem);
            grid-column-gap: calc(var(--sz) * 0.25rem);
            grid-row-gap: calc(var(--sz) * 0.75rem);
            font-size: calc(var(--sz) * 1rem);
          }

          .apple-remote-body.AR2 {
            background: linear-gradient(30deg, rgb(0, 0, 0) 0%, rgb(41, 41, 41) 70%);
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto 1fr;
            grid-row-gap: 0;
            border: solid #2d2d2d calc(var(--sz) * 0.01rem);
            min-height: calc(var(--sz) * 41rem);
            overflow: hidden;
          }

          .AR2TopSection, .AR2BottomSection {
            display: grid;
            justify-items: center;
            align-content: flex-start;
            grid-column-gap: calc(var(--sz) * 1.5rem);
            grid-row-gap: calc(var(--sz) * 0.5rem);
            grid-template-columns: 1fr 1fr;
            box-sizing: border-box;
          }

          .AR2TopSection {
            background: linear-gradient(0deg, rgba(46,46,46,1) 0%, rgba(59,59,59,1) 100%);
            height: 100%;
            width: 100%;
            padding-bottom: calc(var(--sz) * 0.25rem);
          }

          .AR2BottomSection {
            padding-top: calc(var(--sz) * 0.5rem);
          }

          .apple-remote-body.AR2 > div > button:nth-of-type(odd), .apple-remote-body.AR3 > button:nth-of-type(odd) {
            justify-self: self-end;
            transform-origin: center center;
          }

          .apple-remote-body.AR2 > div > button:nth-of-type(even), .apple-remote-body.AR3 > button:nth-of-type(even) {
            justify-self: self-start;
            transform-origin: center center;
          }

          .remote-body {
            background: linear-gradient(90deg, rgba(27,27,27,1) 0%, rgba(37,37,37,1) 8%, rgba(55,55,55,1) 50%,
                                               rgba(37,37,37,1) 92%, rgba(27,27,27,1) 100%);
            border: solid #252525 calc(var(--sz) * 0.14rem);
            border-radius: calc(var(--sz) * 8rem) calc(var(--sz) * 8rem) calc(var(--sz) * 8rem) calc(var(--sz) * 8rem) / calc(var(--sz) * 2.5rem) calc(var(--sz) * 2.5rem) calc(var(--sz) * 2.5rem) calc(var(--sz) * 2.5rem);
            padding: calc(var(--sz) * 1.428rem) calc(var(--sz) * 0.714rem) calc(var(--sz) * 2.143rem) calc(var(--sz) * 0.714rem);
            display: grid;
            justify-items: center;
            grid-column-gap: calc(var(--sz) * 0.14rem);
            grid-row-gap: calc(var(--sz) * 0.5rem);
            grid-template-columns: 1fr 1fr 1fr;
            width: calc(var(--sz) * 12.286rem);
          }

          .remote-body.AF6 {
            border-radius: calc(var(--sz) * 2.8rem);
          }

          .XM2 {
            min-height: calc(var(--sz) * 53rem);
            grid-template-rows: repeat(7, auto) 1fr;
            border-radius: calc(var(--sz) * 2rem);
          }

          .AL1, .AL2 {
            display: block;
            width: unset;
            border-radius: calc(var(--sz) * 0.5rem);
            padding: calc(var(--sz) * 1.4rem) calc(var(--sz) * 0.714rem);
          }

          .two-col-span {
            grid-column-start: 1;
            grid-column-end: 3;
            width: 100%;
            display: grid;
            justify-content: center;
            grid-row-gap: calc(var(--sz) * 0.143rem);
            align-content: center;
          }

          .three-col-span {
            grid-column-start: 1;
            grid-column-end: 4;
            width: 100%;
            display: grid;
            grid-column-gap: calc(var(--sz) * 0.143rem);
            grid-template-columns: 50% 50%;
            align-content: center;
          }

          .apple-tv-top {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            width: calc(var(--sz) * 11.286rem);
            justify-items: center;
            align-items: center;
            justify-content: center;
            align-content: center;
            padding-top: calc(var(--sz) * 0.85rem);
          }

          .remote-body #channel-up-button, .remote-body #channel-down-button {
            --mdc-icon-size: 38px;
          }

          .nsappsgrid {
            display: grid;
            grid-row-gap: calc(var(--sz) * 0.6rem);
          }

          .afappsgrid {
            display: grid;
            margin-top: calc(var(--sz) * 0.57rem);
            row-gap: calc(var(--sz) * 0.9rem);
            justify-items: center;
          }

          .XM2 .afappsgrid {
            margin-bottom: calc(var(--sz) * 0.57rem);
          }

          .appLauncherAppsContainer {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-content: center;
            align-items: center;
            justify-content: center;
            gap: calc(var(--sz) * 0.9rem);
          }

          .ns1-wings {
            grid-column-start: 1;
            grid-column-end: 3;
            width: 100%;
            height: calc(var(--sz) * 25rem);
            margin-top: calc(var(--sz) * -1rem);
            display: grid;
            grid-template-columns: 1fr 27% 1fr;
          }

          #ns1spine {
            display: grid;
            padding: calc(var(--sz) * 4rem) 0;
          }

          #ns1spine button {
            all: unset;
            background: transparent;
          }

          #ns1spine button:active {
            background: #363636;
          }

          #wingL {
            background: rgb(28 28 28);
            -webkit-clip-path: polygon(100% 15%, 100% 85%, 0 100%, 0 0);
            clip-path: polygon(100% 15%, 100% 85%, 0 100%, 0 0);
            margin-left: calc(var(--sz) *-.714rem);
            border-right: solid #121212 calc(var(--sz) * .15rem);
          }

          #wingR {
            background: rgb(28 28 28);
            -webkit-clip-path: polygon(100% 0, 100% 100%, 0 85%, 0 15%);
            clip-path: polygon(100% 0, 100% 100%, 0 85%, 0 15%);
            margin-right: calc(var(--sz) *-.714rem);
            border-left: solid #121212 calc(var(--sz) * .15rem);
          }

          .ALControlsContainer {
            display: flex;
            gap: calc(var(--sz) * .25rem);
            place-items: center;
            padding-top: calc(var(--sz) * 2rem);
            margin-top: calc(var(--sz) * 2rem);
            border-top: groove rgb(0 0 0 / 42%) calc(var(--sz) * 0.2rem);
            justify-content: space-evenly;
            flex-wrap: wrap;
            flex-direction: row;
            width: 100%;
          }

          .ALControlsContainer.noApps {
            padding-top: 0;
            margin-top: 0;
            border-top: 0;
          }

          .ALControlsContainer > div {
            display: grid;
            justify-items: center;
            justify-content: center;
          }

          .left-pocket-controls {
            display: flex;
            column-gap: calc(var(--sz) * 2rem);
            row-gap: calc(var(--sz) * 0.5rem);
            flex-wrap: wrap;
            justify-content: center;
          }

          .ALControlsContainer .row {
            display: flex;
            align-items: center;
            gap: calc(var(--sz) * 0.5rem);
            padding: calc(var(--sz) * 0.75rem);
            background: rgb(255 255 255 / 6%);
            border: inset #000 calc(var(--sz) * 0.2rem);
          }

          .ALControlsContainer .row.noframes {
            background: none;
            border: 0;
          }

          .right-pocket-controls > .row {
            column-gap: calc(var(--sz) * 0.5rem);
            line-height: calc(var(--sz) * .4rem);
          }

          .remote-button {
            height: calc(var(--sz) * 3.572rem);
            width: calc(var(--sz) * 3.572rem);
            border: solid black calc(var(--sz) * 0.0714rem);
            border-radius: 100%;
            display: grid;
            justify-content: center;
            align-content: center;
            color: rgb(198 198 198);
            background: rgb(33 33 33);
            box-shadow: rgb(0 0 0 / 13%) 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.143rem 0);
            cursor: pointer;
            line-height: normal;
            user-select: none;
            padding: calc(var(--sz) * 0.2857rem);
          }

          #power-button {
            height: calc(var(--sz) * 2.8rem);
            width: calc(var(--sz) * 2.8rem);
            margin-bottom: calc(var(--sz) * -0.643rem);
          }

          .shield-remote-body .remote-button {
            height: calc(var(--sz) * 3rem);
            width: calc(var(--sz) * 3rem);
          }

          .apple-remote-body .remote-button {
            height: calc(var(--sz) * 4.75rem);
            width: calc(var(--sz) * 4.75rem);
          }

          .apple-remote-body.AR2 .remote-button {
            height: calc(var(--sz) * 4.5rem);
            width: calc(var(--sz) * 4.5rem);
          }

          .apple-remote-body.AR1 #back-button.remote-button, .apple-remote-body.AR2 #back-button.remote-button {
            font-size: calc(var(--sz) * 1rem);
            font-weight: 600;
          }

          .apple-remote-body.AR2 #search-button.remote-button, .apple-remote-body.AR3 #back-button.remote-button {
            background: linear-gradient(rgb(0, 0, 0) 0%, rgb(48, 48, 48) 100%);
            outline: solid #2b2b2b calc(var(--sz) * 0.01rem);
          }


          .chromecast-remote-body .remote-button, .chromecast-remote-body #keyboard-button {
            background: #fff;
            border: solid #bfbfbf calc(var(--sz) * 0.02em);
            height: calc(var(--sz) * 4.2rem);
            width: calc(var(--sz) * 4.2rem);
            box-shadow: rgb(0 0 0 / 5%) 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.1428rem) 0;
          }

          .chromecast-remote-body.CC2 .remote-button {
            background: #d5e0e4;
            border-color: #a6a6a6;
          }

          .chromecast-remote-body.CC3 .remote-button {
            background: #efddd6;
            border-color: #bababa;
          }

          .chromecast-remote-body .srcButton {
            border: solid #bfbfbf calc(var(--sz) * 0.02em);
            height: calc(var(--sz) * 4.2rem);
            width: calc(var(--sz) * 4.2rem);
            border-radius: 100%;
          }

          .chromecast-remote-body #keyboard-button {
            background: #484848;
          }

          .chromecast-remote-body #keyboard-button > ha-icon {
            color: rgb(235, 235, 234);
          }

          .chromecast-remote-body.CC2 #keyboard-button {
            background: linear-gradient(0deg, rgba(186,214,198,1) 0%, rgba(222,239,231,1) 90%);
            border-color: #a6a6a6;
          }

          .chromecast-remote-body.CC3 #keyboard-button {
            background: linear-gradient(0deg, rgba(221,158,152,1) 0%, rgba(228,186,180,1) 90%);
            border-color: #a6a6a6;
          }

          .chromecast-remote-body.CC2 #keyboard-button > ha-icon,
          .chromecast-remote-body.CC3 #keyboard-button > ha-icon {
            color: #fff;
          }

          .apple-remote-body .srcButton {
            border: solid #bfbfbf calc(var(--sz) * 0.02em);
            height: calc(var(--sz) * 4.75rem);
            width: calc(var(--sz) * 4.75rem);
            border-radius: 100%;
          }

          .shield-remote-body #power-button, .XM2 #power-button{
            height: calc(var(--sz) * 3rem);
            width: calc(var(--sz) * 3rem);
            margin-bottom: unset;
          }

          .XM2 #power-button, .XM2 #keyboard-button, .AL2 #power-button, .AL2 #keyboard-button {
            height: calc(var(--sz) * 3.572rem);
            width: calc(var(--sz) * 3.572rem);
          }

          .roku-remote-body #keyboard-button {
            height: calc(var(--sz) * 2.25rem);
            width: 100%;
          }

          .AL2 #power-button {
            margin-bottom: unset;
          }

          .right {
            display: flex;
            width: 100%;
            justify-content: flex-end;
          }

          .apple-remote-body #power-button {
            background: none;
            border: gray 0.01rem solid;
            transform: scale(0.75);
            margin: 0;
          }

          .shield-remote-body #power-button > ha-icon {
            color: #851313;
          }

          .apple-remote-body #power-button > ha-icon {
            color: rgb(33, 33, 33);
          }

          .roku-remote-body #power-button > ha-icon {
            color: #970000;
          }

          .XM2 #power-button > ha-icon {
            color: #835437;
          }

          #headset-button {
            height: calc(var(--sz) * 2.8rem);
            width: calc(var(--sz) * 2.8rem);
            margin-bottom: calc(var(--sz) * -0.643rem);
          }

          .shield-remote-body #home-button {
            --mdc-icon-size: 17px;
          }

          .shield-remote-body.ns1-body #home-button {
            --mdc-icon-size: 23px;
          }

          .apple-remote-body #back-button {
            --mdc-icon-size: 36px;
          }

          .shield-remote-body #back-button {
            --mdc-icon-size: 41px;
          }

          .notch {
            background: #181818;
            height: calc(var(--sz) * 1rem);
            width: calc(var(--sz) * 0.4rem);
            margin-top: calc(var(--sz) * -0.5rem);
            border-radius: calc(var(--sz) * 0.2rem);
          }

          .apple-remote-body .notch {
            margin: 0;
            width: calc(var(--sz) * 1rem);
            height: calc(var(--sz) * 0.4rem);
          }

          .chromecast-remote-body .notch {
            height: calc(var(--sz) * 0.8rem);
            width: calc(var(--sz) * 0.3rem);
            rotate: 90deg;
            margin: 0;
          }

          .shieldNotch {
            grid-column: 1 / 3;
            background: rgb(24, 24, 24);
            height: calc(var(--sz) * 0.3rem);
            width: calc(var(--sz) * 0.75rem);
            margin-top: calc(var(--sz) * -0.5rem);
            border-radius: calc(var(--sz) * 0.2rem);
          }

          .notchtall {
            margin-bottom: calc(var(--sz) * 1.65rem);
          }

          .ns1-body .shieldNotch {
            height: calc(var(--sz) * 0.75rem);
            width: calc(var(--sz) * 2.2rem);
            border: solid #282828 calc(var(--sz) * 0.12rem);
            border-radius: calc(var(--sz) * 0.5rem);
          }

          #keyboard-button {
            height: calc(var(--sz) * 3rem);
            width: calc(var(--sz) * 3rem);
          }

          .teal {
            background: #09727e;
          }

          .dpadContainer{
            grid-column: 1 / 4;
            display: grid;
            margin-bottom: calc(var(--sz) * 0.65rem);
            width: calc(var(--sz) * 11.286rem);
            height: calc(var(--sz) * 11.286rem);
            position: relative;
          }

          .chromecast-remote-body .dpadContainer,
          .apple-remote-body .dpadContainer {
            grid-column: 1 / 3;
            margin-bottom: 0;
          }

          .apple-remote-body.AR2 .dpadContainer {
            overflow: hidden;
          }

          .XM2 .dpadContainer,
          .XM.dpadContainer {
            align-items: center;
            justify-items: center;
            position: relative;
          }

          .shieldDpad {
            grid-column: 1 / 3;
            width: calc(var(--sz) * 8.2rem);
            height: calc(var(--sz) * 8.2rem);
            position: relative;
          }

          .ALControlsContainer .dpadContainer {
            grid-column: unset;
          }

          .centerbutton{
            all: unset;
            cursor: pointer;
            border: solid black calc(var(--sz) * 0.0714rem);
            margin-left: calc(var(--sz) * 2.357rem);
            margin-top: calc(var(--sz) * 2.357rem);
            width: calc(var(--sz) * 6.428rem);
            height: calc(var(--sz) * 6.428rem);
            border-radius: 100%;
            position: absolute;
            background: rgba(55,55,55,1);
            box-shadow: inset 0 0.calc(var(--sz) * 2857rem) calc(var(--sz) * 0.1428rem) calc(var(--sz) * -0.1428rem) #000000d9;
            z-index: 5;
          }

          .directionButtonContainer{
            transform: rotate(45deg);
            border: calc(var(--sz) * 0.0714rem) solid black;
            display: grid;
            grid-template-columns: auto auto;
            border-radius: 100%;
            overflow: hidden;
            box-shadow: rgb(20 20 20) calc(var(--sz) * 0.1428rem) calc(var(--sz) * 0.1428rem) calc(var(--sz) * 0.4285rem);
            position: relative;
          }

          .AR2 .directionButtonContainer {
            margin-top: calc(var(--sz) * -1.4rem);
            margin-left: calc(var(--sz) * -1.35rem);
            border-radius: 0;
            border: 0;
            overflow: unset;
            box-shadow: none;
          }

          .chromecast-remote-body .directionButtonContainer,
          .CC .directionButtonContainer {
            border: calc(var(--sz) * 0.0714rem) solid #9d9d9d;
            box-shadow: rgb(0 0 0 / 29%) 0 0 calc(var(--sz) * 0.4rem) calc(var(--sz) * 0.02rem);
          }

          .dpadbutton{
            all: unset;
            cursor: pointer;
            width: calc(var(--sz) * 5.5714rem);
            height: calc(var(--sz) * 5.5714rem);
            background: #141414;
            color: white;
            font-size: calc(var(--sz) * 1rem);
            outline: solid #2e2e2e calc(var(--sz) * 0.0714rem);
          }

          .AR2 .dpadbutton {
            width: calc(var(--sz) * 7rem);
            height: calc(var(--sz) * 7rem);
            outline: none;
          }

          .XM2 .dpadbutton,
          .XM .dpadbutton {
            background: rgb(28 28 28);
            border: solid rgb(15 15 15) calc(var(--sz) * 0.03rem);
            outline: none;
            box-sizing: border-box;
          }

          .XM2 .dpadbutton:active,
          .XM .dpadbutton:active {
            background: rgb(24 24 24);
            border: solid #000 calc(var(--sz) * 0.15rem);
          }

          .chromecast-remote-body.CC1 .dpadbutton,
          .CC .dpadbutton {
            background: #fff;
            outline: solid #c5c5c5 calc(var(--sz) * 0.0714rem);
          }

          .chromecast-remote-body.CC2 .dpadbutton,
          .CC2 .dpadbutton {
            background: #cad4d8;
            outline: solid #c5c5c5 calc(var(--sz) * 0.0714rem);
          }

          .chromecast-remote-body.CC3 .dpadbutton,
          .CC3 .dpadbutton {
            background: #e1d2cc;
            outline: solid #c5c5c5 calc(var(--sz) * 0.0714rem);
          }

          .AR3 .dpadbutton:nth-child(1)::after,
          .AR1 .dpadbutton:nth-child(1)::after {
            content: "•";
            text-align: center;
            display: block;
            font-weight: 600;
            color: rgb(198, 198, 198);
            padding-right: calc(var(--sz) * 1.2rem);
            padding-bottom: calc(var(--sz) * 1.2rem);
          }

          .AR3 .dpadbutton:nth-child(2)::after,
          .AR1 .dpadbutton:nth-child(2)::after {
            content: "•";
            text-align: center;
            display: block;
            font-weight: 600;
            color: rgb(198, 198, 198);
            padding-left: calc(var(--sz) * 1.2rem);
            padding-bottom: calc(var(--sz) * 1.2rem);
          }

          .AR3 .dpadbutton:nth-child(3)::after,
          .AR1 .dpadbutton:nth-child(3)::after {
            content: "•";
            text-align: center;
            display: block;
            font-weight: 600;
            color: rgb(198, 198, 198);
            padding-right: calc(var(--sz) * 1.2rem);
            padding-top: calc(var(--sz) * 1.2rem);
          }

          .AR3 .dpadbutton:nth-child(4)::after,
          .AR1 .dpadbutton:nth-child(4)::after {
            content: "•";
            text-align: center;
            display: block;
            font-weight: 600;
            color: rgb(198, 198, 198);
            padding-left: calc(var(--sz) * 1.2rem);
            padding-top: calc(var(--sz) * 1.2rem);
          }

          .dpadbutton:active {
            background: #282828;
          }

          .chromecast-remote-body .dpadbutton:active,
          .CC .dpadbutton:active {
            background: #efefef;
          }

          .chromecast-remote-body.CC2 .dpadbutton:active {
            background: #bfcbd0;
          }

          .chromecast-remote-body.CC3 .dpadbutton:active {
            background: #dbcac3;
          }

          .dpadbuttonShield {
            width: calc(var(--sz) * 4.101rem);
            height: calc(var(--sz) * 4.101rem);
          }

          .centerbuttonShield {
            width: calc(var(--sz) * 5rem);
            height: calc(var(--sz) * 5rem);
            margin: 0px;
            padding: 0px;
            place-self: center;
            position: absolute;
            background: rgba(37,37,37,1);
            background: radial-gradient(circle, rgba(28,28,28,1) 0%, rgba(37,37,37,1) 100%);
          }

          .XM2 .centerbutton,
          .XM .centerbutton {
            background: rgb(28, 28, 28);
            border: solid black calc(var(--sz) * 0.2rem);
            width: calc(var(--sz) * 5rem);
            height: calc(var(--sz) * 5rem);
            margin: 0px;
            position: absolute;
            box-sizing: border-box;
          }

          .chromecast-remote-body .centerbutton,
          .CC .centerbutton {
            background: linear-gradient(rgb(226 226 226) 0%, rgb(255, 255, 255) 70%);
            box-shadow: inset rgb(0 0 0 / 10%) 0 calc(var(--sz) * 0.15rem) calc(var(--sz) * 0.4rem);
            border: solid #dddddd calc(var(--sz) * 0.0714rem);
            width: calc(var(--sz) * 4rem);
            height: calc(var(--sz) * 4rem);
            place-self: center;
            position: absolute;
            margin: 0;
            padding: 0;
          }

          .chromecast-remote-body.CC2 .centerbutton {
            background: linear-gradient(0deg, rgb(208 218 225) 5%, rgb(181 194 199) 100%);
            border: solid #bbc5c9 calc(var(--sz)* 0.0714rem);
          }

          .chromecast-remote-body.CC3 .centerbutton {
            background: linear-gradient(0deg, rgba(245,226,219,1) 0%, rgba(196,180,174,1) 100%);
            border: solid #d9d1d1 calc(var(--sz)* 0.0714rem);
          }

          .apple-remote-body .centerbutton,
          .AR3 .centerbutton {
            background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(48,48,48,1) 100%);
            width: calc(var(--sz) * 6rem);
            height: calc(var(--sz) * 6rem);
            margin-left: calc(var(--sz) * 2.65rem);
            margin-top: calc(var(--sz) * 2.65rem);
            box-sizing: border-box;
            transform-origin: center bottom;
            outline: solid #2e2e2e calc(var(--sz) * 0.0714rem);
          }

          .AR1 .centerbutton {
            background: linear-gradient(180deg, rgb(147, 148, 150) 0%, rgb(207, 211, 213) 100%);
          }

          .apple-remote-body.AR2 .centerbutton {
            border-radius: 0;
            border: 0;
            outline: 0;
            transform: scale(.75);
            transform-origin: center;
            text-align: center;
          }

          .apple-remote-body.AR2 .dpadContainer button {
            background: none;
            color: transparent;
          }
          .apple-remote-body.AR2 .dpadContainer button:hover,
          .apple-remote-body.AR2 .dpadContainer button:active {
            color: #636363;
            text-align: center;
          }


          .centerbutton:active {
            transform: scale(95%);
          }

          .chromecast-remote-body .centerbutton:active,
          .CC .centerbutton:active {
            transform: none;
            box-shadow: inset rgb(0 0 0 / 19%) 0 calc(var(--sz) * 0.25rem) calc(var(--sz) * 0.4375rem) calc(var(--sz) * 0.125rem);
          }


          .apple-remote-body .centerbutton:active,
          .AR3 .centerbutton:active {
            transform: none;
            border: calc(var(--sz) * 0.2rem) solid black;
          }

          .AR3 .centerbutton:active {
            background: linear-gradient(180deg, rgba(0,0,0,1) 15%, rgba(48,48,48,1) 100%);
          }

          .XM1 .centerbutton:active,
          .XM2 .centerbutton:active,
          .XM .centerbutton:active {
            transform: none;
            border: solid #090909 calc(var(--sz) * 0.24rem);
            background: rgb(26 26 26);
          }

          .minimal.dpadContainer {
            align-items: center;
            justify-items: center;
            display: grid;
            grid-template-columns: auto calc(var(--sz) * 5rem) auto;
            grid-template-rows: auto calc(var(--sz) * 5rem) auto;
            margin: calc(var(--sz) * 1rem);
            height: calc(var(--sz) * 10.3rem);
            aspect-ratio: 1/1;
          }

          .minimal .directionButtonContainer {
            border-radius: 30%;
            border: none;
            box-shadow: none;
          }

          .minimal .dpadbutton {
            background: transparent;
            outline: none;
            display: grid;
            height: 100%;
            width: 100%;
            transform-origin: center center;
            align-self: start;
            justify-items: center;
            justify-content: center;
            align-content: center;
          }

          .minimal .dpadbutton > svg {
            pointer-events: none;
          }

          .minimal .dpadbutton:active {
            transform: scale(0.8);
          }

          .minimal .dpadbutton > svg {
            display: inline-block;
            transform: scale(calc(var(--sz) * .55));
          }

          .minimal .centerbutton {
            border: calc(var(--sz) * 0.175rem) solid rgb(179 179 179);
            background: transparent;
            border-radius: 25%;
            width: calc(var(--sz) * 3rem);
            height: calc(var(--sz) * 3rem);
            margin: 0;
            position: unset;
          }

          .minimal.dpadContainer #up-button {
             align-content: flex-start;
          }

          .minimal.dpadContainer #right-button {
             justify-content: flex-end;
          }

          .minimal.dpadContainer #down-button {
             align-content: flex-end;
          }

          .minimal.dpadContainer #left-button {
             justify-content: flex-start;
          }

          .remote-button:active {
            box-shadow: inset rgb(0 0 0 / 13%) 0 calc(var(--sz) * 0.2857rem) calc(var(--sz) * 0.1428rem) 0;
          }

          .remote-button > ha-icon {
            color: #c6c6c6;
          }

          .remote-button:active > ha-icon, .remote-button:active > .mdiSubstituteIconWrapper {
            color: #bcbcbc;
            transform: scale(calc(var(--sz) * 0.85));
          }

          .chromecast-remote-body ha-icon {
            color: #686868;
          }

          .chromecast-remote-body .remote-button:active {
            box-shadow: rgb(0 0 0 / 5%) 0px calc(var(--sz) * 0.125rem) calc(var(--sz) * 0.125rem) calc(var(--sz) * 0.1875rem) inset;
          }

          .chromecast-remote-body .remote-button:active > ha-icon {
            color: #000;
          }

          .square {
            border-radius: 0;
            border: 0;
            padding: 0;
          }

          .round-top {
            border-radius: 100% 100% 0 0;
            border-bottom: 0;
            box-shadow: none;
            height: calc(var(--sz) * 3.92857rem);
            margin-bottom: calc(var(--sz) * -0.5rem);
          }

          .round-bottom {
            border-radius: 0 0 100% 100%;
            border-top: 0;
            height: calc(var(--sz) * 3.92857rem);
            margin-top: calc(var(--sz) * -0.5rem);
          }

          .apple-remote-body .round-bottom, .apple-remote-body.AR2 .round-bottom {
            height: calc(var(--sz) * 5.25rem);
          }

          .square:active, .round-bottom:active {
              box-shadow: none;
          }

          .remote-body #volume-up-button, .remote-body #volume-down-button {
              font-size: calc(var(--sz) * 2.5rem);
          }
          .apple-remote-body #volume-up-button, .apple-remote-body #volume-down-button {
              font-size: calc(var(--sz) * 2.25rem);
          }
          .remote-body #programmable-one-button, .remote-body #programmable-two-button {
              font-size: calc(var(--sz) * 1.75rem);
          }

          .remote-body #volume-up-button:active, .remote-body #volume-down-button:active {
              font-size: calc(var(--sz) * 2rem);
          }
          .apple-remote-body #volume-up-button:active, .apple-remote-body #volume-down-button:active {
              font-size: calc(var(--sz) * 1.75rem);
          }
          .remote-body #programmable-one-button:active, .remote-body #programmable-two-button:active {
              font-size: calc(var(--sz) * 1.45rem);
          }

          .srcButton .deviceAppIcon {
            /* TV banners need the same artwork area as built-in launcher logos. */
            width: calc(var(--sz) * 4.5rem);
            height: calc(var(--sz) * 1.6rem);
            object-fit: contain;
            pointer-events: none;
          }
          .shield-remote-body .srcButton .deviceAppIcon {
            width: calc(var(--sz) * 6.8rem);
            height: calc(var(--sz) * 2.1rem);
          }
          .chromecast-remote-body .srcButton .deviceAppIcon {
            width: calc(var(--sz) * 3.25rem);
            height: calc(var(--sz) * 3.25rem);
          }
          .apple-remote-body .srcButton .deviceAppIcon {
            width: calc(var(--sz) * 3.55rem);
            height: calc(var(--sz) * 3.55rem);
          }
          .srcButton .deviceAppName[hidden] {
            display: none !important;
          }
          .srcButton span {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .srcButton {
            height: calc(var(--sz) * 2rem);
            width: calc(var(--sz) * 5.714rem);
            border: solid #090909 calc(var(--sz) * 0.0714rem);
            border-radius: calc(var(--sz) * 2rem);
            display: grid;
            justify-items: center;
            align-content: center;
            color: rgb(198 198 198);
            background: rgb(33 33 33);
            box-shadow: rgb(0 0 0 / 25%) 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.1428rem) 0;
            cursor: pointer;
            line-height: normal;
            user-select: none;
            font-size: calc(var(--sz) * 1.14rem);
            padding: calc(var(--sz) * 0.285rem);
            white-space: nowrap;
            transform: translate3d(0,0,0); /* because ios safari mobile */
            overflow: hidden;
            transition: filter 250ms;
            filter: var(--appButtonFilter);
          }

          .apple-remote-body .srcButton {
            border: none;
            box-shadow: rgb(0 0 0 / 13%) 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.143rem 0);
            transition: none;
          }

          .chromecast-remote-body .srcButton {
            filter: grayscale(40%);
            box-shadow: rgb(0 0 0 / 5%) 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.1428rem) 0;
          }

          .srcButton:active, .srcButton.appActive {
            filter: none;
            box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.142rem) rgb(255 255 255 / 20%);
            transition: filter 0s;
          }

          .srcButton.appActiveUnknown {
            filter: grayscale(0%) brightness(100%);
            transition: filter 0s;
          }

          .shield-remote-body .srcButton {
            height: calc(var(--sz) * 3rem);
            width: calc(var(--sz) * 8rem);
          }

          .srcButton:active {
            filter: brightness(90%);
            transform: scale(.95);
            box-shadow: none;
            transform-origin: center bottom;
          }

          .chromecast-remote-body .srcButton:active {
            filter: none;
          }

          .srcButton svg {
            pointer-events: none;
            max-width: calc(var(--sz) * 4.5rem);
            max-height: calc(var(--sz) * 1.6rem);
          }

          .shield-remote-body .srcButton svg {
            max-height: calc(var(--sz) * 2.1rem);
            max-width: calc(var(--sz) * 6.8rem);
          }

          .chromecast-remote-body .srcButton svg, .apple-remote-body .srcButton svg {
            max-width: calc(var(--sz) * 3.25rem);
            max-height: calc(var(--sz) * 3.25rem);
          }

          .apple-remote-body .srcButton svg {
            max-width: calc(var(--sz) * 3.55rem);
            max-height: calc(var(--sz) * 3.55rem);
          }

          .chromecastBottomIndentedRow {
            display: grid;
            width: calc(100% - (var(--sz) * 1.2rem) - (var(--sz) * 0.4rem * 2));
            padding: calc(var(--sz) * 0.4rem);
            box-sizing: border-box;
            grid-template-columns: auto 1fr auto;
            box-shadow: rgb(0 0 0 / 28%) 0 calc(var(--sz) * 0.12rem) calc(var(--sz) * 0.4rem) inset;
            border-radius: calc(var(--sz) * 5rem);
            grid-column: 1 / 3;
            place-items: center;
            margin-top: calc(var(--sz) * 1rem);
          }

          .chromecastBottomIndentedRow .remote-button, .chromecastBottomIndentedRow .input-button {
            height: calc(var(--sz) * 2.3rem) !important;
            width: calc(var(--sz) * 2.3rem) !important;
            margin: 0 !important;
          }

          .chromecastVolumeRocker {
            grid-column: 1 / 3;
            place-items: center;
            width: calc(100% - (var(--sz) * 1.2rem) - (var(--sz) * 0.4rem * 2));
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .chromecastVolumeRocker > button {
            height: calc(var(--sz) * 2rem) !important;
            width: 100% !important;
            box-shadow: rgb(0 0 0 / 5%) 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.1428rem) 0;
          }

          .chromecastVolumeRocker #volume-down-button {
            border-radius: calc(var(--sz) * 2rem) 0 0 calc(var(--sz) * 2rem);
            border-right: calc(var(--sz) * 0.05rem) solid #ebebeb;
          }

          .chromecastVolumeRocker #volume-up-button {
            border-radius: 0% calc(var(--sz) * 2rem) calc(var(--sz) * 2rem) 0;
            border-left: 0;
          }

          .digit-pad-button {
            font-size: calc(var(--sz) * 1rem);
            font-weight: 600;
            height: calc(var(--sz) * 2rem);
            border-radius: calc(var(--sz) * 1em);
          }

          .digit-pad-button:active {
            font-size: calc(var(--sz) * 0.9rem);
          }

          .deviceNameTop {
            white-space: nowrap;
            font-size: calc(var(--sz) * 1rem);
            overflow: hidden;
            color: var(--devicenamecolor);
            margin-left: -1rem;
            text-align: center;
            display: grid;
            height: calc(var(--sz) * 2rem);
            align-items: center;
            align-content: center;
            justify-items: center;
          }

          .AF6 .deviceNameTop,
          .AFJTV .deviceNameTop,
          .AFXF2 .deviceNameTop{
            grid-column: 1 / 4;
            display: block;
            text-align: center;
            margin: 0;
            padding: 0;
          }

          .AL1 .deviceNameTop, .AL2 .deviceNameTop {
            margin: 0rem 0px calc(var(--sz) * 1.25rem);
            display: block;
            height: unset;
            overflow: unset;
            font-size: calc(var(--sz) * 1.25rem);
          }

          .roku-remote-body .deviceNameTop {
            margin-left: 0;
            height: auto;
          }

          .roku-remote-body.RSR .deviceNameTop {
              position: absolute;
          }

          .shield-remote-body .deviceNameTop {
            display: unset;
            align-items: unset;
            align-content: unset;
            justify-items: unset;
            margin-left: 0;
            margin-top: -1rem;
          }

          .shield-remote-body.ns1-body .deviceNameTop {
            margin-top: 0rem;
            margin-bottom: -0.75rem;
          }

          .XM2 .deviceNameTop {
            grid-column: 1 / 4;
            margin: calc(var(--sz) * -1rem) 0 0;
          }

          .chromecast-remote-body .deviceNameTop {
            grid-column: 1 / 3;
            margin: unset;
            margin-top: calc(var(--sz) * 1rem);
            height: unset;
            display: block;
          }

          .apple-remote-body .deviceNameTop {
            grid-column: 1 / 3;
            margin: 0 0 calc(var(--sz) * -1.8rem) 0;
          }

          .apple-remote-body.AR1 .deviceNameTop {
            margin: calc(var(--sz) * -4rem) 0 calc(var(--sz) * -2.5rem) 0;
          }

          .deviceNameBottom {
            grid-column: 1/4;
            color: var(--devicenamecolor);
            font-size: calc(var(--sz) * 1.25rem);
            margin-bottom: calc(var(--sz) * -2.5rem);
            margin-top: calc(var(--sz) * .5rem);
            white-space: nowrap;
            overflow: hidden;
            width: 100%;
            text-align: center;
            align-self: flex-end;
          }

          .AF6 .deviceNameBottom {
            margin-bottom: calc(var(--sz) * -1rem);
          }

          .AL1 .deviceNameBottom, .AL2 .deviceNameBottom {
            margin-bottom: unset;
            margin-top: calc(var(--sz) * 1.8rem);
            overflow: unset;
          }

          .apple-remote-body .deviceNameBottom {
            grid-column: 1 / 3;
            margin-bottom: calc(var(--sz) * -1.25rem);
          }

          .shield-remote-body .deviceNameBottom {
            grid-column: 1 / 3;
            font-size: calc(var(--sz) * 1rem);
            margin-top: 0px;
            margin-bottom: 0px;
            position: absolute;
            bottom: calc(var(--sz) * 0.3rem);
          }

          .chromecast-remote-body .deviceNameBottom {
            grid-column: 1 / 3;
            margin-right: unset;
            margin-bottom: calc(var(--sz) * 1rem);
            margin-left: unset;
            margin-top: calc(var(--sz) * 0.5rem);
            height: unset;
            display: block;
          }

          .roku-remote-body.RTR .deviceNameBottom {
             margin-bottom: calc(var(--sz) * 0.1rem);
             margin-top: calc(var(--sz) * -1.25rem);
          }

          .roku-remote-body.RWR .deviceNameBottom,
          .roku-remote-body.RHR .deviceNameBottom {
            position: absolute;
            width: calc(var(--sz) * 11.45rem);
            bottom: calc(var(--sz) * 3.5rem);
          }

          .firemoteVersionNumber {
            text-shadow: 0px 1px 0px #1e1e1e, 0px -1px 0px #000;
            color: #4e4e4e;
            align-self: right;
            text-align: right;
            width: 100%;
            justify-self: right;
            display: block !important;
            font-size: calc(var(--sz) * .9rem);
            position: absolute;
            bottom: calc(var(--sz) * .35rem);
            right: calc(var(--sz) * .4rem);
          }

          .customLauncherBackground {
            pointer-events: none;
            position: absolute;
            height: 100%;
            width: 100%;
            transform: scale(1.25);
            z-index: 1;
            overflow: hidden;
          }

          .customLauncherTxt {
            z-index: 2;
            pointer-events: none;
          }

          .customLauncherIcon {
            display: flex;
            max-width: 100%;
            max-height: 100%;
            transform: scale(var(--sz));
            display: flex;
            align-items: center;
            z-index: 2;
          }

          .customLauncherImg {
            pointer-events: none;
            max-width: 100%;
            max-height: 100%;
            overflow: hidden;
            z-index: 2;
          }

          .AFJTV #tv-button,
          .AFXF2 #tv-button{
            font-size: calc(var(--sz) * 0.8rem);
            font-weight: 600;
          }

          .colorButtons {
            display: flex;
            justify-content: space-around;
            margin: calc(var(--sz) * 0.5rem) 0 calc(var(--sz) * 4.5rem) 0;;
          }

          .AFJTV div.colorButtons button,
          .AFXF2 div.colorButtons button{
            border-radius: 100%;
            overflow: hidden;
            height: calc(var(--sz) * 2.3rem);
            width: calc(var(--sz) * 2.3rem);
          }

          .AFJTV div.colorButtons button svg,
          .AFXF2 div.colorButtons button svg {
            height: calc(var(--sz) * 1.1rem);
            width: calc(var(--sz) * 1.1rem);
            filter: brightness(0.8) saturate(0.8);
            pointer-events: none;
          }

          .AFJTV div.colorButtons button:active svg,
          .AFXF2 div.colorButtons button:active svg{
            filter: none;
            transform: scale(0.85)
          }

          .AFJTV .jvcbrandlogo {
             height: 0;
             display: flex;
             justify-content: center;
             align-items: center;
             margin-top: calc(var(--sz) * -2rem);
          }

          .AFJTV .jvcbrandlogo svg {
            width: calc(var(--sz) * 5rem);
            height: auto;
          }

          .AFXF2 .xf2brandlogo {
             height: 0;
             display: flex;
             justify-content: center;
             align-items: center;
             margin-top: calc(var(--sz) * -1.5rem);
          }

          .AFXF2 .xf2brandlogo svg {
            width: calc(var(--sz) * 7rem);
            height: auto;
          }

          /* Homatics styles */
          .homatics-remote-body {
            align-content: start;
            grid-row-gap: calc(var(--sz)* 1rem);
            background: #ebebea;
            border-color: #dcdcdc;
            border-radius: calc(var(--sz)* 2.8rem);
            min-height: calc(var(--sz)* 48.5rem);
            padding: calc(var(--sz) * 1.1rem) calc(var(--sz) * 0.714rem) calc(var(--sz) * 2.143rem) calc(var(--sz) * 0.714rem);
            box-shadow: 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.214rem) rgb(0 0 0 / 10%);
          }

          .homatics-remote-body.HO2,
          .homatics-remote-body.HO4 {
            background: #252525;
            border-color: #2f2f2f;
          }

          .HO1 .remote-button,
          .HO3 .remote-button {
            background: #fff;
            color: rgb(106, 106, 106);
            border: solid rgb(186 186 186) calc(var(--sz)* 0.0714rem);
            box-shadow: rgb(0 0 0 / 15%) 0px calc(var(--sz)* 0.063rem) calc(var(--sz)* 0.188rem);
          }

          .HO2 .remote-button,
          .HO4 .remote-button {
            background: #2f2f2f;
            border: solid rgb(15 15 15) calc(var(--sz)* 0.0714rem);
          }

          .homatics-remote-body .remote-button:active {
            box-shadow: inset rgb(0 0 0 / 42%) 0px calc(var(--sz)* 0.1rem) calc(var(--sz)* 0.188rem);
            filter: brightness(0.94);
            border: solid rgb(232 232 232) calc(var(--sz)* 0.0714rem);
          }

          .HO2 .remote-button:active,
          .HO4 .remote-button:active {
            border: solid rgb(10 10 10) calc(var(--sz)* 0.0714rem);
          }

          .HO2 .litbutton,
          .HO4 .litbutton {
            box-shadow: 0 0 calc(var(--sz)* 0.857rem) calc(var(--sz)* 0.0714rem) rgb(171 253 255 / 15%);
          }

          .HO1 .litbutton > ha-icon,
          .HO3 .litbutton > ha-icon {
            color: #00979b !important;
          }

          .HO2 .litbutton > ha-icon,
          .HO4 .litbutton > ha-icon {
            color: #abfdff !important
          }

          .homatics-remote-body .deviceNameTop {
            grid-column: 1 / 4;
            margin: unset;
            height: unset;
            display: block;
            margin-bottom: calc(var(--sz) * -1rem);
          }

          .HO1 #home-button.litbutton > ha-icon, .HO3 #home-button.litbutton > ha-icon {
            color: #03585b !important
          }

          .HO2 #home-button.litbutton > ha-icon, .HO4 #home-button.litbutton > ha-icon {
            color: #45989a !important
          }

          .homatics-remote-body .micHole {
            background: black;
            border-radius: 100%;
            height: calc(var(--sz)* 0.3rem);
            aspect-ratio: 1 / 1;
            align-self: end;
            justify-self: center;
          }

          .homatics-remote-body #power-button, .homatics-remote-body #input-button {
            height: calc(var(--sz)* 2.75rem);
            width: calc(var(--sz)* 2.75rem);
          }

          .remote-body.HO1 .remote-button > ha-icon,
          .remote-body.HO3 .remote-button > ha-icon {
            color: rgb(106 106 106);
          }

          .remote-body.HO2 .remote-button > ha-icon {
            color: rgb(245 245 245);
          }

          .homatics-remote-body .remote-button.dark {
            background: linear-gradient(180deg, rgb(168 168 168) 26%, rgb(144 144 144) 50%, rgb(128 128 128) 75%);
          }

          .homatics-remote-body.HO2 .remote-button.dark,
          .homatics-remote-body.HO4 .remote-button.dark {
            background: linear-gradient(180deg, rgb(255 255 255) 26%, rgb(221 221 221) 50%, rgb(211 211 211) 75%);
          }

          .homatics-remote-body .remote-button.dark > ha-icon {
            color: #000;
          }

          .homatics-remote-body.HO2 .remote-button.dark > ha-icon,
          .homatics-remote-body.HO4 .remote-button.dark > ha-icon {
            color: #4b4b4b;
          }

          .remote-body.HO2 .remote-button.light > ha-icon {
            color: #464646;
          }

          .homatics-remote-body .micNLight {
            display: grid;
            align-content: space-between;
            padding: calc(var(--sz) * 0.25rem) 0;
          }

          .homatics-remote-body .activityLight {
            background: #ff0000;
            box-shadow: #ff0000 0 0 calc(var(--sz)* 0.6rem) calc(var(--sz)* 0.05rem);
            border-radius: 100%;
            height: calc(var(--sz)* 0.4rem);
            aspect-ratio: 1 / 1;
            opacity: 0;
          }

          .homatics-remote-body.HO2 .activityLight,
          .homatics-remote-body.HO4 .activityLight {
            background: #adff87;
            box-shadow: lime 0 0 calc(var(--sz)* 0.6rem) calc(var(--sz)* 0.05rem);
          }

          .homatics-remote-body .digit-pad-button {
            font-size: calc(var(--sz)* 1rem);
            font-weight: 600;
            height: calc(var(--sz)* 2.75rem);
            width: calc(var(--sz)* 2.75rem);
            border-radius: 100%;
            margin-bottom: calc(var(--sz)* -0.6rem);
          }

          .homatics-remote-body .colorButtons {
            display: flex;
            justify-content: space-around;
            margin: calc(var(--sz) * 0.5rem) 0 0 0;
          }

          .homatics-remote-body div.colorButtons button {
            border-radius: 100%;
            overflow: hidden;
            height: calc(var(--sz) * 2.3rem);
            width: calc(var(--sz) * 2.3rem);
          }

          .homatics-remote-body div.colorButtons button svg{
            height: calc(var(--sz) * 1.1rem);
            width: calc(var(--sz) * 1.1rem);
            filter: brightness(0.8) saturate(0.8);
            pointer-events: none;
          }

          .homatics-remote-body div.colorButtons button:active svg{
            filter: none;
            transform: scale(0.85)
          }


          .homatics-remote-body #bookmark-button, .homatics-remote-body #settings-button {
            align-self: end;
          }

          .homatics-remote-body #keyboard-button {
            height: calc(var(--sz)* 3.572rem);
            width: calc(var(--sz)* 3.572rem);
            margin-bottom: calc(var(--sz)* 1.1rem);
          }

          .homatics-remote-body .directionButtonContainer {
            box-shadow: rgb(0 0 0 / 15%) calc(var(--sz)* 0.025rem) calc(var(--sz)* 0.025rem) calc(var(--sz)* 0.025rem)
            background: #cacaca;
            border: calc(var(--sz)* 0.0714rem) solid #cacaca;
          }

          .homatics-remote-body .directionButtonContainer:has(#down-button:active) {
            box-shadow: none;
          }

          .homatics-remote-body .dpadContainer {
            align-items: center;
            justify-items: center;
            position: relative;
            margin-top: calc(var(--sz)* -1.5rem);
            margin-bottom: calc(var(--sz)* -1.5rem);
            isolation: isolate;
          }

          .homatics-remote-body .dpadbutton, .homatics-remote-body .dpadbutton:active {
            all: unset;
            cursor: pointer;
            width: calc(var(--sz)* 5.5714rem);
            height: calc(var(--sz)* 5.5714rem);
            outline: solid #a6a6a6 calc(var(--sz)* 0.0714rem);
          }

          .homatics-remote-body .dpadbutton {
            background: #adadad;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }

          .HO2 .dpadbutton,
          .HO4 .dpadbutton {
            background: rgb(216 216 216);
            outline: solid rgb(200 200 200) calc(var(--sz)* 0.0714rem);
          }

          .homatics-remote-body .dpadbutton:active {
            background: rgb(153 153 153);
            box-shadow: inset #4f4f4f 0 0 calc(var(--sz)* 0.35rem) 0px;
            transform: none;
            filter: none;
            overflow: hidden;
            backdrop-filter: none;
            appearance: none;
          }

          .HO2 .dpadbutton:active,
          .HO4 .dpadbutton:active {
            background: rgb(200 200 200);
            box-shadow: none;
            outline: solid #989898 calc(var(--sz)* 0.0714rem);
          }

          .homatics-remote-body .centerbutton {
            background: linear-gradient(180deg, #c8c8c8 0%, rgba(255, 255, 255, 1) 100%);
            border: solid #a1a1a1 calc(var(--sz)* 0.25rem);
            width: calc(var(--sz)* 5.13rem);
            height: calc(var(--sz)* 5.13rem);
            margin: 0px;
            position: absolute;
            box-sizing: border-box;
            isolation: isolate;
          }

          .HO2 .centerbutton,
          .HO4 .centerbutton {
            background: linear-gradient(0deg, rgb(48 48 48) 26%, rgb(39 39 39) 50%, rgb(33 33 33) 75%);
            border: solid #252525 calc(var(--sz)* 0.25rem);
          }

          .homatics-remote-body .centerbutton:active {
            transform: none;
            filter: brightness(0.92);
            border: solid #b3b3b3 calc(var(--sz)* 0.29rem);
          }

          .HO2 .centerbutton:active,
          .HO4 .centerbutton:active {
            filter: brightness(0.8);
            border: solid #000 calc(var(--sz)* 0.29rem);
          }

          .homatics-remote-body #home-button {
            align-self: end;
            margin-top: calc(var(--sz)* 1.1rem);
            z-index: 10;  /* Required for companion app to prevent accidental push of down button */
          }

          .homatics-remote-body .volumeChannelSection {
            grid-column-start: 1;
            grid-column-end: 4;
            display: grid;
            grid-template-columns: 33% 1fr 33%;
            grid-template-areas: "vol-up   mute ch-up"
                                 "vol-down mute ch-down";
            grid-row-gap: 0;
            width: 100%;
            justify-items: center;
            align-items: center;
          }

          .homatics-remote-body #volume-up-button-container {
            grid-area: vol-up;
            margin-bottom: 0;
            border-bottom: 0;
            font-size: calc(var(--sz)* 2rem);
          }

          .homatics-remote-body #volume-up-button-container ha-icon,
          .homatics-remote-body #channel-up-button-container ha-icon {
            margin-top: calc(var(--sz)* -1rem);
          }

          .homatics-remote-body #voltext,
          .homatics-remote-body #chtext {
            max-width: calc(var(--sz)* 1.5rem);
            max-height: calc(var(--sz)* 1rem);
            position: absolute;
            padding-left: calc(var(--sz)* 1.0rem);
            pointer-events: none;
            margin-top: calc(var(--sz)* -0.5rem);
          }

          .homatics-remote-body #voltext > * {
            fill: rgb(106 106 106);
          }

          .homatics-remote-body.HO2 #voltext > *,
          .homatics-remote-body.HO4 #voltext > * {
            fill: rgb(245, 245, 245);
          }

          .homatics-remote-body #chtext {
            max-width: calc(var(--sz)* 1rem);
            padding-left: calc(var(--sz)* 1.25rem);
          }

          .homatics-remote-body #chtext > * {
            fill: rgb(106 106 106);
          }

          .homatics-remote-body.HO2 #chtext > *,
          .homatics-remote-body.HO4 #chtext > * {
            fill: rgb(245, 245, 245);
          }

          .homatics-remote-body #channel-up-button-container {
            grid-area: ch-up;
            margin-bottom: 0;
            border-bottom: 0;
          }

          .homatics-remote-body #mute-button {
            grid-area: mute;
            height: calc(var(--sz)* 2.6rem);
            width: calc(var(--sz)* 2.6rem);
          }

          #soundeqtext {
            grid-area: mute;
            max-width: calc(var(--sz)* 3.5rem);
            max-height: calc(var(--sz)* 0.7rem);
            margin-top: calc(var(--sz)* 4.1rem);
            fill: rgb(106 106 106);
          }

          .HO2 #soundeqtext, .HO4 #soundeqtext {
            fill: rgb(245, 245, 245);
          }

          .homatics-remote-body #volume-down-button {
            grid-area: vol-down;
            border-top: 0;
            font-size: calc(var(--sz)* 2rem);
          }

          .homatics-remote-body #volume-down-button ha-icon,
          .homatics-remote-body #channel-down-button ha-icon {
            margin-bottom: calc(var(--sz)* -1rem);
          }

          .homatics-remote-body #channel-down-button {
            grid-area: ch-down;
            border-top: 0;
          }

          .homatics-remote-body #volume-down-button,
          .homatics-remote-body #channel-down-button {
            box-shadow: rgb(0 0 0 / 15%) 0px calc(var(--sz)* 0.063rem) calc(var(--sz)* 0.1rem);
          }

          .homatics-remote-body #volume-up-button,
          .homatics-remote-body #channel-up-button {
            box-shadow: none;
          }

          .homatics-remote-body #volume-up-button:active,
          .homatics-remote-body #channel-up-button:active {
            filter: none;
            background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 95%);
            border: solid rgb(186 186 186) calc(var(--sz)* 0.0714rem);
            border-bottom: 0;
          }

          .homatics-remote-body.HO2 #volume-up-button:active,
          .homatics-remote-body.HO2 #channel-up-button:active,
          .homatics-remote-body.HO4 #volume-up-button:active,
          .homatics-remote-body.HO4 #channel-up-button:active {
            filter: none;
            background: linear-gradient(0deg, rgb(46 46 46) 0%, rgb(38 38 38) 95%);
            border: solid rgb(0 0 0) calc(var(--sz)* 0.08rem);
            border-bottom: 0;
          }

          .homatics-remote-body #volume-down-button:active,
          .homatics-remote-body #channel-down-button:active {
            filter: none;
            background: linear-gradient(0deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 95%);
            box-shadow: none;
            border: solid rgb(186 186 186) calc(var(--sz)* 0.0714rem);
            border-top: 0;
          }

          .homatics-remote-body.HO2 #volume-down-button:active,
          .homatics-remote-body.HO2 #channel-down-button:active,
          .homatics-remote-body.HO4 #volume-down-button:active,
          .homatics-remote-body.HO4 #channel-down-button:active {
            filter: none;
            background: linear-gradient(180deg, rgb(46 46 46) 0%, rgb(38 38 38) 95%);
            box-shadow: none;
            border: solid rgb(0 0 0) calc(var(--sz)* 0.08rem);
            border-top: 0;
          }

          .homatics-remote-body .afappsgrid {
            margin-bottom: calc(var(--sz)* 7rem);
          }

          .homatics-remote-body .srcButton {
            border: solid #a7a7a7 calc(var(--sz) * 0.0714rem);
          }

          .homaticsLogo {
            position: absolute;
            bottom: calc(var(--sz)* 3rem);
            width: calc(var(--sz)* 12.286rem);
            text-align: center;
          }

          .homaticsLogo svg {
            max-width: calc(var(--sz)* 6.5rem);
            max-height: calc(var(--sz)* 3.2rem);
            stroke: rgb(161 161 161);
          }

          .HO2 .homaticsLogo svg,
          .HO4 .homaticsLogo svg {
            stroke: #000;
          }

          .homatics-remote-body .deviceNameBottom {
            position: absolute;
            bottom: calc(var(--sz)* 3.5rem);
            width: calc(var(--sz)* 12.286rem);
            text-align: center;
          }

          .homatics-remote-body .srcButton {
            border-color: rgb(255 255 255 / 0%);
          }

          .homatics-remote-body .srcButton.appActive {
            box-shadow: rgb(0 0 0 / 13%) 0 calc(var(--sz)* 0.214rem) calc(var(--sz)* 0.1428rem) 0, white 0 0 calc(var(--sz)* 0.857rem) calc(var(--sz)* 0.429rem);
            border-color: #e6e6e6;
            animation-name: homatics_flash_border;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .HO2 .srcButton.appActive, .HO4 .srcButton.appActive {
            box-shadow: rgb(255 255 255 / 0%) 0 calc(var(--sz)* 0.214rem) calc(var(--sz)* 0.1428rem) 0, rgb(255 255 255 / 31%) 0 0 calc(var(--sz)* 0.857rem) calc(var(--sz)* 0.429rem);
          }

          @keyframes homatics_flash_border {
            0% {
              border-color: rgb(0 0 0 / 16%);
            }
            50% {
              border-color: #fff;
            }
            100% {
              border-color: rgb(0 0 0 / 16%);
            }
          }

          /* end Homatics styles */


          /* onn. styles */
          .remote-body.ON1, .remote-body.ON2 {
            align-content: start;
            grid-row-gap: calc(var(--sz)* 1rem);
            background: #ebebea;
            border-color: #dcdcdc;
            border-radius: calc(var(--sz)* 2.8rem);
            min-height: calc(var(--sz)* 48.5rem);
            padding: calc(var(--sz) * 1.1rem) calc(var(--sz) * 0.714rem) calc(var(--sz) * 2.143rem) calc(var(--sz) * 0.714rem);
            box-shadow: 0 calc(var(--sz) * 0.214rem) calc(var(--sz) * 0.214rem) rgb(0 0 0 / 10%);
          }

          .remote-body.ON2 {
            background: #252525;
            border-color: #2f2f2f;
          }

          .ON1 .remote-button, .ON2 .remote-button {
            background: #fff;
            color: rgb(106, 106, 106);
            border: solid rgb(186 186 186) calc(var(--sz)* 0.0714rem);
            box-shadow: rgb(0 0 0 / 15%) 0px calc(var(--sz)* 0.063rem) calc(var(--sz)* 0.188rem);
          }

          .ON2 .remote-button {
            background: #2f2f2f;
            border: solid rgb(15 15 15) calc(var(--sz)* 0.0714rem);
          }

          .ON1 .remote-button:active, .ON2 .remote-button:active {
            box-shadow: inset rgb(0 0 0 / 42%) 0px calc(var(--sz)* 0.1rem) calc(var(--sz)* 0.188rem);
            filter: brightness(0.94);
            border: solid rgb(232 232 232) calc(var(--sz)* 0.0714rem);
          }

          .ON2 .remote-button:active {
            border: solid rgb(10 10 10) calc(var(--sz)* 0.0714rem);
          }

          .remote-body.ON1 .remote-button.litbutton {
            background: #ffffe7;
          }

          .remote-body.ON1 #power-button.litbutton > ha-icon,
          .remote-body.ON2 .remote-button.litbutton > ha-icon {
            color: #017374 !important;
          }

          .remote-body.ON2 #power-button.litbutton > ha-icon {
            color: #ebef66 !important;
          }

          .remote-body.ON1 .remote-button:active > ha-icon,
          .remote-body.ON2 .remote-button:active > ha-icon {
            transform: scale(calc(var(--sz)* 0.90));
          }

          .remote-body.ON1 .remote-button.dark,
          .remote-body.ON2 .remote-button.dark {
            background: linear-gradient(180deg, rgba(69,69,69,1) 26%, rgba(55,55,55,1) 50%, rgba(45,45,45,1) 75%);
          }

          .remote-body.ON2 .remote-button.light {
            background: linear-gradient(0deg, #c8c8c8 0%, rgba(255, 255, 255, 1) 100%);
          }

          .remote-body.ON1 .remote-button > ha-icon {
            color: rgb(106 106 106);
          }

          .remote-body.ON2 .remote-button > ha-icon {
            color: rgb(245 245 245);
          }

          .remote-body.ON1 .remote-button.dark > ha-icon {
            color: #ebebea;
          }

          .remote-body.ON2 .remote-button.light > ha-icon {
            color: #464646;
          }

          .remote-body.ON1 .remote-button.dark.litbutton {
            background: #004040;
          }

          .remote-body.ON1 .remote-button.litbutton > ha-icon,
          .remote-body.ON1 .remote-button.dark.litbutton > ha-icon,
          .remote-body.ON2 .remote-button.dark.litbutton > ha-icon {
            color: #ffffab;
          }

          .ON1 .directionButtonContainer, .ON2 .directionButtonContainer {
            box-shadow: rgb(0 0 0 / 73%) calc(var(--sz)* 0.025rem) calc(var(--sz)* 0.025rem) calc(var(--sz)* 0.025rem);
            background: black;
          }

          .ON1 .directionButtonContainer:has(#down-button:active), .ON2 .directionButtonContainer:has(#down-button:active) {
            box-shadow: none;
          }

          .ON1 .dpadContainer, .ON2 .dpadContainer {
            align-items: center;
            justify-items: center;
            position: relative;
            margin-top: calc(var(--sz)* -1.5rem);
            margin-bottom: calc(var(--sz)* -1.5rem);
            isolation: isolate;
          }

          .ON1 .dpadbutton, .ON1 .dpadbutton:active,
          .ON2 .dpadbutton, .ON2 .dpadbutton:active {
            all: unset;
            cursor: pointer;
            width: calc(var(--sz)* 5.5714rem);
            height: calc(var(--sz)* 5.5714rem);
            outline: solid #2e2e2e calc(var(--sz)* 0.0714rem);
          }

          .ON1 .dpadbutton, .ON2 .dpadbutton {
            background: rgba(55, 55, 55, 1);
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            -webkit-tap-highlight-color: transparent;
          }

          .ON2 .dpadbutton {
            background: rgb(216 216 216);
            outline: solid rgb(200 200 200) calc(var(--sz)* 0.0714rem);
          }

          .ON1 .dpadbutton:active, .ON2 .dpadbutton:active {
            background: rgba(45, 45, 45, 1);
            box-shadow: inset #161616 0 0 calc(var(--sz)* 0.35rem) 0px;
            transform: none;
            filter: none;
            overflow: hidden;
            backdrop-filter: none;
            appearance: none;
          }

          .ON2 .dpadbutton:active {
            background: rgb(200 200 200);
            box-shadow: none;
            outline: solid #989898 calc(var(--sz)* 0.0714rem);
          }

          .ON1 .centerbutton, .ON2 .centerbutton {
            background: linear-gradient(180deg, #c8c8c8 0%, rgba(255, 255, 255, 1) 100%);
            border: solid #2b2b2b calc(var(--sz)* 0.25rem);
            width: calc(var(--sz)* 5.13rem);
            height: calc(var(--sz)* 5.13rem);
            margin: 0px;
            position: absolute;
            box-sizing: border-box;
            isolation: isolate;
          }

          .ON2 .centerbutton {
            background: linear-gradient(0deg, rgb(48 48 48) 26%, rgb(39 39 39) 50%, rgb(33 33 33) 75%);
          }

          .ON1 .centerbutton:active, .ON2 .centerbutton:active {
            transform: none;
            filter: brightness(0.92);
            border: solid #2b2b2b calc(var(--sz)* 0.29rem);
          }

          .ON2 .centerbutton:active {
            filter: brightness(0.8);
          }

          .ON1 #power-button, .ON1 #input-button,
          .ON2 #power-button, .ON2 #magic-star-button {
            height: calc(var(--sz)* 2.5rem);
            width: calc(var(--sz)* 2.5rem);
          }

          .ON1 #power-button, .ON2 #power-button {
            justify-self: left;
          }

          .ON1 .micNLight, .ON2 .micNLight {
            display: grid;
            align-content: space-between;
            padding: calc(var(--sz) * 0.25rem) 0;
          }

          .ON1 .activityLight, .ON2 .activityLight {
            background: #adff87;
            box-shadow: lime 0 0 calc(var(--sz)* 0.6rem) calc(var(--sz)* 0.05rem);
            border-radius: 100%;
            height: calc(var(--sz)* 0.4rem);
            aspect-ratio: 1 / 1;
            opacity: 0;
          }

          .ON1 .micHole, .ON2 .micHole {
            background: black;
            border-radius: 100%;
            height: calc(var(--sz)* 0.3rem);
            aspect-ratio: 1 / 1;
            align-self: end;
            justify-self: center;
          }

          .ON1 #input-button, .ON2 #magic-star-button {
            justify-self: right;
          }

          .ON1 #profile-button, .ON1 #settings-button,
          .ON2 #profile-button, .ON2 #settings-button {
            align-self: end;
          }

          .ON1 #keyboard-button, .ON2 #keyboard-button {
            height: calc(var(--sz)* 3.572rem);
            width: calc(var(--sz)* 3.572rem);
            margin-bottom: calc(var(--sz)* 1.1rem);
          }

          .ON1 #home-button, .ON2 #home-button {
            align-self: end;
            margin-top: calc(var(--sz)* 1.1rem);
            z-index: 10;  /* Required for companion app to prevent accidental push of down button */
          }

          .ON1 .volumeChannelSection, .ON2 .volumeChannelSection {
            grid-column-start: 1;
            grid-column-end: 4;
            display: grid;
            grid-template-columns: 33% 1fr 33%;
            grid-template-areas: "vol-up   mute ch-up"
                                 "vol-down mute ch-down";
            grid-row-gap: 0;
            width: 100%;
            justify-items: center;
            align-items: center;
          }

          .ON1 #volume-up-button, .ON2 #volume-up-button {
            grid-area: vol-up;
            margin-bottom: 0;
            border-bottom: 0;
            font-size: calc(var(--sz)* 2rem);
          }

          .ON1 #channel-up-button, .ON2 #channel-up-button {
            grid-area: ch-up;
            margin-bottom: 0;
            border-bottom: 0;
          }

          .ON1 #mute-button, .ON2 #mute-button {
            grid-area: mute;
            height: calc(var(--sz)* 2.6rem);
            width: calc(var(--sz)* 2.6rem);
          }

          .ON1 #volume-down-button, .ON2 #volume-down-button {
            grid-area: vol-down;
            border-top: 0;
            font-size: calc(var(--sz)* 2rem);
          }

          .ON1 #channel-down-button, .ON2 #channel-down-button {
            grid-area: ch-down;
            border-top: 0;
          }

          .ON1 #volume-up-button:active, .ON1 #channel-up-button:active {
            filter: none;
            background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(240, 240, 240, 1) 95%);
            border: solid rgb(186 186 186) calc(var(--sz)* 0.0714rem);
            border-bottom: 0;
          }

          .ON2 #volume-up-button:active, .ON2 #channel-up-button:active {
            filter: none;
            background: linear-gradient(0deg, rgb(46 46 46) 0%, rgb(38 38 38) 95%);
            border-bottom: 0;
          }

          .ON1 #volume-down-button:active, .ON1 #channel-down-button:active {
            filter: none;
            background: linear-gradient(0deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 95%);
            box-shadow: none;
            border: solid rgb(186 186 186) calc(var(--sz)* 0.0714rem);
            border-top: 0;
          }

          .ON2 #volume-down-button:active, .ON2 #channel-down-button:active {
            filter: none;
            background: linear-gradient(180deg, rgb(46 46 46) 0%, rgb(38 38 38) 95%);
            box-shadow: none;
            border-top: 0;
          }

          .ON1 .afappsgrid, .ON2 .afappsgrid {
            align-content: start;
            margin: calc(var(--sz)* 0.75rem) 0 calc(var(--sz)* 3.75rem) 0;
          }

          .ON1 .srcButton {
            border-color: #ccc;
          }

          .ON2 .srcButton {
            border-color: #292929;
          }

          .ON1 .srcButton.appActive, .ON2 .srcButton.appActive {
            box-shadow: rgb(0 0 0 / 13%) 0 calc(var(--sz)* 0.214rem) calc(var(--sz)* 0.1428rem) 0, white 0 0 calc(var(--sz)* 0.857rem) calc(var(--sz)* 0.429rem);
            border-color: #e6e6e6;
            animation-name: flash_border;
            animation-duration: 2s;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }

          .ON2 .srcButton.appActive {
            box-shadow: rgb(255 255 255 / 0%) 0 calc(var(--sz)* 0.214rem) calc(var(--sz)* 0.1428rem) 0, rgb(255 255 255 / 31%) 0 0 calc(var(--sz)* 0.857rem) calc(var(--sz)* 0.429rem);
          }

          @keyframes flash_border {
            0% {
              border-color: rgb(0 0 0 / 16%);
            }
            50% {
              border-color: #fff;
            }
            100% {
              border-color: rgb(0 0 0 / 16%);
            }
          }

          .ON1 .srcButton:active, .ON2 .srcButton:active {
            box-shadow: inset rgb(0 0 0 / 25%) 0 calc(var(--sz)* 0.214rem) calc(var(--sz)* 0.1428rem) 0;
          }

          .ON1 .deviceNameTop, .ON2 .deviceNameTop {
            grid-column: 1 / 4;
            margin: calc(var(--sz)* -1rem) 0;
          }

          .ON1 .deviceNameBottom, .ON2 .deviceNameBottom {
            position: absolute;
            bottom: calc(var(--sz)* 0.75rem);
            margin: 0;
            width: calc(var(--sz)* 12.286rem);
            text-align: center;
          }

          .onnLogo {
            position: absolute;
            bottom: calc(var(--sz)* 2rem);
            width: calc(var(--sz)* 12.286rem);
            text-align: center;
          }

          .onnLogo svg {
            max-width: calc(var(--sz)* 5rem);
            max-height: calc(var(--sz)* 2rem);
          }

          .ON2 .onnLogo svg {
            fill: #949494;
          }
          /* end onn. styles */

          ${unsafeCSS(launcherCSS)}

          .functionFindRemoteButton, .functionMuteButton, .functionRebootButton,
          .functionSystemUpdateButton, .functionKeyboardButton, .functionMenuButton, .functionSettingsButton {
            color: #ff0000;
            font-weight: bold;
            background: #000;
            border: solid calc(var(--sz) * 0.1rem) #850000;
            display: block;
          }

          .functionAppSwitchButton, .functionAppManageButton {
            background: #000;
          }

          .ON1 .functionRebootButton, .ON2 .functionRebootButton {
            background: #fff;
          }

          .ON1 .functionSearchGoogleTVButton, .ON1 .functionCaptionsButton, .ON1 .functionpairingButton,
          .ON2 .functionSearchGoogleTVButton, .ON2 .functionCaptionsButton, .ON2 .functionpairingButton {
            background: #fff;
            color: #000;
          }

          .roku-remote-body .functionMuteButton, .roku-remote-body .functionVolumeUpButton, .roku-remote-body .functionVolumeDownButton, .roku-remote-body .functionFindRemoteButton,
          .roku-remote-body .searchButton, .roku-remote-body .functionChannelUpButton, .roku-remote-body .functionChannelDownButton {
            color: #c6c6c6;
            font-weight: bold;
            background: #662d91;
            border: 0;
            filter: none !important;
            display: grid;
          }

          .functionAppleSettingsButton {
            background: linear-gradient(0deg, rgba(143,143,148,1) 0%, rgba(228,228,233,1) 100%);
            border: solid #838383 calc(var(--sz) * 0.05rem) !important;
          }

          .functionKeyboardButton {
            display: inherit;
          }

          .functionFindRemoteButton > ha-icon, .functionMuteButton > ha-icon, .functionRebootButton > ha-icon, .functionSettingsButton > ha-icon {
            display: none;
          }

          .ON1 .functionSystemUpdateButton, .ON2 .functionSystemUpdateButton {
            background: #fff;
            color: #000;
          }

          .functionAppSwitchButton:active, .functionFindRemoteButton:active, .functionMuteButton:active, .functionRebootButton:active, .functionSettingsButton:active {
            filter: none;
            box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.142rem) rgb(255 255 255 / 20%) !important;
          }

          .ON1 .functionFindRemoteButton,
          .ON2 .functionFindRemoteButton {
            color: yellow;
            border: solid calc(var(--sz) * 0.1rem) #017374;
          }

          .shield-remote-body .functionFindRemoteButton, .shield-remote-body .functionMuteButton, .shield-remote-body .functionSystemUpdateButton,
          .shield-remote-body .functionMuteButton, .shield-remote-body .functionRebootButton, .shield-remote-body .functionSettingsButton, .shield-remote-body .functionCaptionsButton {
            color: rgb(153, 231, 0);
            border: solid calc(var(--sz) * 0.1rem) #456800;
          }

          .functionFindRemoteButton {
            font-size: calc(var(--sz) * .75rem);
          }
          .shield-remote-body .functionFindRemoteButton {
            font-size: calc(var(--sz) * .75rem);
            --mdc-icon-size: calc(var(--sz) * 1.4rem);
          }
          .roku-remote-body .functionFindRemoteButton {
            font-size: calc(var(--sz) * .6rem);
          }

          .functionMuteButton {
            font-size: calc(var(--sz) * 1rem);
          }
          .shield-remote-body .functionMuteButton {
            font-size: calc(var(--sz) * 1.2rem);
            --mdc-icon-size: calc(var(--sz) * 1.6rem);
          }

          .functionRebootButton {
            font-size: calc(var(--sz) * 1rem);
          }
          .shield-remote-body .functionRebootButton {
            font-size: calc(var(--sz) * 1rem);
            --mdc-icon-size: calc(var(--sz) * 1.6rem);
          }
          .chromecast-remote-body .functionRebootButton {
            font-size: calc(var(--sz) * 0.95rem);
            background: #fff;
          }

          .apple-remote-body .functionAppSwitchButton {
            background: rgb(33, 33, 33);
          }

          .functionSettingsButton {
            font-size: calc(var(--sz) * .75rem);
          }
          .shield-remote-body .functionSettingsButton {
            font-size: calc(var(--sz) * 0.86rem);
            --mdc-icon-size: calc(var(--sz) * 1.5rem);
          }
          .chromecast-remote-body .functionSettingsButton, .chromecast-remote-body .functionSystemUpdateButton {
            font-size: calc(var(--sz) * 0.7rem);
            background: #fff;
          }

          .functionControlCenterButton {
            background: rgb(215 215 215);
            border: solid #838383 calc(var(--sz) * 0.05rem) !important;
          }

          .remote-logo {
            grid-column-start: 1;
            grid-column-end: 4;
            padding: calc(var(--sz) * 2.5rem) calc(var(--sz) * 2.357rem) 0 calc(var(--sz) * 2.357rem);
            width: calc(var(--sz) * 7.5714rem);
          }

          .AF6 .remote-logo {
            padding: calc(var(--sz) * .75rem) calc(var(--sz) * 2.357rem) 0 calc(var(--sz) * 2.357rem);
          }

          .miLogo, .xiaomiLogo {
            align-self: flex-end;
            padding-bottom: calc(var(--sz) * 1.3rem)
          }

          .miLogo {
            width: calc(var(--sz) * 2.75rem);
          }

          .ns1-body #keyboard-button {
            margin-top: calc(var(--sz) * 1rem);
            height: calc(var(--sz) * 5rem);
            width: calc(var(--sz) * 5rem);
            --mdc-icon-size: 34px;
          }

          .ns1-body .remote-button:active {
            border: solid #395600 0.0714rem;
            box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(153 231 0 / 20%);
          }

          .ns1-body .remote-button:active > ha-icon {
            color: #99e700 !important;
          }

          .litbutton {
              border: solid #4b4c3c 0.0714rem;
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(255 255 25 / 15%);
          }
          .litbutton > ha-icon {
            color: yellow !important;
          }

          .shield-remote-body .litbutton {
              border: solid #500101 0.0714rem;
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(255 25 25 / 15%);
          }

          .shield-remote-body .litbutton > ha-icon,
          .roku-remote-body #power-button.litbutton > ha-icon {
            color: red !important;
          }

          .roku-remote-body #power-button.litbutton {
            border: 0.0714rem solid rgb(92 0 0);
            box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(229 58 58 / 31%);
          }

          .roku-remote-body.RTR #power-button {
            background: #810000;
          }

          .roku-remote-body.RTR #power-button > ha-icon {
            color: #c6c6c6;
          }

          .roku-remote-body.RTR #power-button.litbutton {
            background: rgb(159, 0, 0);
            border: 0.0714rem solid rgb(139, 62, 62);
            box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(229 164 164 / 31%);
          }

          .roku-remote-body.RTR #power-button.litbutton > ha-icon {
            color: #fff !important;
          }

          .roku-remote-body #home-button.litbutton, .roku-remote-body #playpause-button.litbutton {
            box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(255 255 255 / 20%);
          }

          .roku-remote-body #home-button.litbutton > ha-icon, .roku-remote-body #playpause-button.litbutton > ha-icon {
            color: white !important;
          }

          .XM2 .litbutton {
              border: solid #5c2b00 0.0714rem;
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(229 124 58 / 31%);
          }

          .XM2 .litbutton > ha-icon, .XM2 .litbutton > .mdiSubstituteIconWrapper {
            color: #ff7700 !important;
          }


          .chromecast-remote-body .litbutton, .chromecast-remote-body .appActive {
              position: relative;
              z-index: 2;
          }

          .chromecast-remote-body .appActive {
            border: transparent;
          }

          .chromecast-remote-body .litbutton::before, .chromecast-remote-body .appActive::before {
            content: "";
            position: absolute;
            z-index: -1;
            inset: 0.25rem;
            background: conic-gradient(from 0deg, rgba(66,133,244,1) 0%, rgba(219,68,55,1) 25%, rgba(244,180,0,1) 50%, rgba(15,157,88,1) 75%, rgba(66,133,244,1) 100%);
            filter: blur(0.3rem) contrast(3);
            transition: opacity 0.3s ease 0s;
            border-radius: inherit;
            animation: spin 7s linear infinite;
          }

          .chromecast-remote-body .appActive::before {
            inset: calc(var(--sz) * -0.25rem);
            filter: contrast(3);
          }

          @keyframes spin {
            0 {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .chromecast-remote-body .litbutton::after, .chromecast-remote-body .appActive::after {
              content: "";
              z-index: -1;
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              background: inherit;
              border-radius: inherit;
              inset: 0.15rem;
          }

          .chromecast-remote-body .litbutton > ha-icon {
            color: #d70000 !important;
          }

          .apple-remote-body .litbutton {
              background: rgb(255 255 255 / 25%) !important;
              border: 0.01rem solid gray !important;
              box-shadow: none;
          }

          .apple-remote-body .litbutton > ha-icon {
              color: rgb(33, 33, 33) !important;
          }

          .shield-remote-body.ns1-body .litbutton {
              border: solid #395600 0.0714rem;
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(153 231 0 / 20%);
          }

          .shield-remote-body.ns1-body .litbutton > ha-icon {
            color: #99e700 !important;
          }

          .dimlitbutton {
              border: solid #34342b calc(var(--sz) * 0.0714rem);
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(255 255 116 / 15%);
          }
          .dimlitbutton > ha-icon {
            color: #e5e59a !important;
          }

          .apple-remote-body .dimlitbutton {
              border: 0.01rem solid gray !important;
              background: none !important;
              box-shadow: none;
          }

          .apple-remote-body .dimlitbutton > ha-icon {
              color: rgb(33, 33, 33) !important;
          }

          .shield-remote-body .dimlitbutton {
              border: solid #3c1818 0.0714rem;
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(255 25 25 / 11%);
          }

          .shield-remote-body .dimlitbutton > ha-icon {
            color: #ff7575 !important;
          }

          .XM2 .dimlitbutton {
              border: solid #463327 0.0714rem;
              box-shadow: 0 0 calc(var(--sz) * 0.857rem) calc(var(--sz) * 0.0714rem) rgb(255 143 36 / 21%);
          }

          .XM2 .dimlitbutton > ha-icon {
            color: #b36d41 !important;
          }

          ha-icon {
            pointer-events: none;
            transform: scale(var(--sz));
          }

          .eightygap {
            height: calc(var(--sz) * 5.7143rem);
          }
  `;
