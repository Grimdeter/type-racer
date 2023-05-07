<script setup lang="ts">
//Function that detects keypresses and does the appropriate things
function highlightKey(e: KeyboardEvent) {
  let allTheKeys = document.getElementById('keyboard')
  let changeKeys = document.getElementsByClassName('shifter')

  //Store all the original values of the non-alphabetical keys
  let originalShifterArray = <string[]>[]

  for (let i = 0; i < changeKeys.length; i++) {
    originalShifterArray.push(changeKeys[i].innerHTML)
  }

  //Set up an array for the replacement values of the non-alphabetical keys that get subbed in when Shift is pressed
  let shifterArray = [
    '~',
    '!',
    '@',
    '#',
    '$',
    '%',
    '^',
    '&',
    '*',
    '(',
    ')',
    '_',
    '+',
    '{',
    '}',
    '|',
    ':',
    '"',
    '<',
    '>',
    '?'
  ]

  let keyPressed = e.keyCode
  let charPressed = e.key
  const keys = document.getElementById(keyPressed.toString())

  keys!.classList.add('pressed')
  // console.log(e)

  //If the user presses CapsLock or Shift, make the alphabetical keys uppercase
  if (charPressed == 'CapsLock' || charPressed == 'Shift') {
    allTheKeys!.classList.add('uppercase')
  }
  //If the user presses Shift, also replace all non-alphabetical keys with their shifted values
  if (charPressed == 'Shift') {
    for (let i = 0; i < changeKeys.length; i++) {
      changeKeys[i].innerHTML = shifterArray[i]
    }
  }
}

//Function that detects when the user lets off a key and does the appropriate things
function removeKeypress(e: KeyboardEvent) {
  let allTheKeys = document.getElementById('keyboard')
  let changeKeys = document.getElementsByClassName('shifter')
  let capsLockKey = document.getElementById('20')
  let shiftKey = document.getElementById('16')

  //Store all the original values of the non-alphabetical keys
  let originalShifterArray = <string[]>[
    '`',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    '-',
    '=',
    '[',
    ']',
    '\\',
    ';',
    "'",
    ',',
    '.',
    '/'
  ]

  for (let i = 0; i < changeKeys.length; i++) {
    originalShifterArray.push(changeKeys[i].innerHTML)
  }

  let keyDepressed = e.keyCode
  const keys = document.getElementById(keyDepressed.toString())

  keys!.classList.remove('pressed')
  //If CapsLock or Shift was just let off, and if the other isn't still on, return keys to lowercase
  if (
    (keyDepressed === 20 && !shiftKey!.classList.contains('pressed')) ||
    (keyDepressed === 16 && !capsLockKey!.classList.contains('pressed'))
  ) {
    allTheKeys!.classList.remove('uppercase')
  }
  //If Shift was just let off, replace all non-alphabetical keys with their original values rather than their shifted values
  if (keyDepressed === 16) {
    // console.log(originalShifterArray)
    for (let i = 0; i < changeKeys.length; i++) {
      changeKeys[i].innerHTML = originalShifterArray[i]
    }
  }
}

//Whenever the user presses a key down, run the proper function
window.addEventListener('keydown', highlightKey)

//Whenever the user lets a key up, run the proper function
window.addEventListener('keyup', removeKeypress)
</script>

<template>
  <div class="container m-auto">
    <div id="keyboard" class="mx-auto">
      <div id="firstrow" class="keyboard-row">
        <kbd class="shifter" id="192">`</kbd>
        <kbd class="shifter" id="49">1</kbd>
        <kbd class="shifter" id="50">2</kbd>
        <kbd class="shifter" id="51">3</kbd>
        <kbd class="shifter" id="52">4</kbd>
        <kbd class="shifter" id="53">5</kbd>
        <kbd class="shifter" id="54">6</kbd>
        <kbd class="shifter" id="55">7</kbd>
        <kbd class="shifter" id="56">8</kbd>
        <kbd class="shifter" id="57">9</kbd>
        <kbd class="shifter" id="48">0</kbd>
        <kbd class="shifter" id="189">-</kbd>
        <kbd class="shifter" id="187">=</kbd>
        <kbd class="long operationKey" id="8">del</kbd>
      </div>
      <div id="secondrow" class="keyboard-row">
        <kbd class="long operationKey" id="9">tab</kbd>
        <kbd id="81">q</kbd>
        <kbd id="87">w</kbd>
        <kbd id="69">e</kbd>
        <kbd id="82">r</kbd>
        <kbd id="84">t</kbd>
        <kbd id="89">y</kbd>
        <kbd id="85">u</kbd>
        <kbd id="73">i</kbd>
        <kbd id="79">o</kbd>
        <kbd id="80">p</kbd>
        <kbd class="shifter" id="219">[</kbd>
        <kbd class="shifter" id="221">]</kbd>
        <kbd class="shifter" id="220">\</kbd>
      </div>
      <div id="thirdrow" class="keyboard-row">
        <kbd class="long operationKey" id="20">caps lock</kbd>
        <kbd id="65">a</kbd>
        <kbd id="83">s</kbd>
        <kbd id="68">d</kbd>
        <kbd id="70">f</kbd>
        <kbd id="71">g</kbd>
        <kbd id="72">h</kbd>
        <kbd id="74">j</kbd>
        <kbd id="75">k</kbd>
        <kbd id="76">l</kbd>
        <kbd class="shifter" id="59">;</kbd>
        <kbd class="shifter" id="222">'</kbd>
        <kbd class="long operationKey" id="13">return</kbd>
      </div>
      <div id="fourthrow" class="keyboard-row">
        <kbd class="longer operationKey" id="16">shift</kbd>
        <kbd id="90">z</kbd>
        <kbd id="88">x</kbd>
        <kbd id="67">c</kbd>
        <kbd id="86">v</kbd>
        <kbd id="66">b</kbd>
        <kbd id="78">n</kbd>
        <kbd id="77">m</kbd>
        <kbd class="shifter" id="188">,</kbd>
        <kbd class="shifter" id="190">.</kbd>
        <kbd class="shifter" id="191">/</kbd>
        <kbd class="longer operationKey" id="16">shift</kbd>
      </div>
      <div id="fifthrow" class="keyboard-row">
        <kbd class="operationKey" id="17">ctrl</kbd>
        <kbd class="long operationKey" id="91">win</kbd>
        <kbd class="operationKey" id="18">alt</kbd>
        <kbd class="spacebar operationKey" id="32">&nbsp;</kbd>
        <kbd class="operationKey" id="18">alt</kbd>
        <kbd class="operationKey" id="188">fn</kbd>
        <kbd class="long operationKey" id="91">Win</kbd>
        <kbd class="operationKey" id="17">ctrl</kbd>
        <!-- <kbd class="operationKey" id="188">fn</kbd> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-size: 8px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  font-family: Quicksand;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
body #keyboard,
body kbd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  box-sizing: border-box;
  border-radius: 4px;
  background: #ccc;
  border: 0.2em solid #888b8d;
  text-align: center;
  font-family: Quicksand;
}
body kbd {
  flex: 1;
}
body .keyboard-row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
}
body div#text {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: center;
  align-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 20em;
  height: 44vh;
  max-height: 44vh;
  font-size: 3em;
  margin-bottom: 4vh;
  text-align: center;
  overflow: auto;
  align-self: flex-end;
  position: relative;
}
body #keyboard {
  width: 56em;
  padding: 0.4em 0.4em 0.8em;
  box-shadow: 0 0.4em 0 #888b8d;
}
body #keyboard kbd {
  line-height: 3.2em;
  height: 3.2em;
  width: 3.2em;
  margin: 0.25em;
  text-align: center;
  color: #fff;
  background-color: #53565a;
  transition: background, position, top, box-shadow 0.1s;
  box-shadow: 0px 2px 0px #888b8d;
}
body #keyboard kbd.long {
  flex-grow: 1;
  flex: 2;
}
body #keyboard kbd.longer {
  flex-grow: 2;
  flex: 3;
}
body #keyboard kbd.spacebar {
  flex-grow: 14;
  flex: 6;
}
body #keyboard .operationKey {
  text-transform: none !important;
}
body #keyboard .pressed {
  background: #ffd100;
  position: relative;
  top: 2px;
  box-shadow: none;
}
body pre {
  height: 3vh;
  line-height: 3vh;
}
body .uppercase kbd {
  text-transform: uppercase;
}

@media (min-width: 768px) {
  body {
    font-size: 10px;
  }
}
@media (min-width: 960px) {
  body {
    font-size: 12px;
  }
}
@media (min-width: 1080px) {
  body {
    font-size: 14px;
  }
}
</style>
