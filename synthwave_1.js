// @title Synthwave T2
// @by dmrzl
// @license CC0

setcpm(80/4)

// C# D# E F# G# A B
const key = "C#2:minor"

const volumeBD = slider(0.98, 0.0, 2.0)
const volumeBDSub = slider(1, 0.0, 2.0)
const volumeClap = slider(0.718, 0.0, 2.0)
const volumeSD = slider(0.438, 0.0, 2.0)
const volumeHH = slider(0.812, 0.0, 2.0)

const volumeReese = slider(1.54, 0.0, 2.0)
const volumeBassline = slider(1.836, 0.0, 2.0)
const volumePads = slider(0.358, 0.0, 2.0)
const volumeChoirs = slider(0.722, 0.0, 2.0)
const volumeLead = slider(0.4, 0.0, 2.0)
const volumePluck = slider(0.082, 0.0, 1.0)
const volumeSynthFill = slider(0.434, 0.0, 2.0)
const volumeSynthBreak = slider(0.284, 0.0, 2.0)


$sc: s("sd:4!8").slow(2).decay(0.5).duck("3:4:5").duckattack(0.3).duckdepth(0.6).postgain(0)

const drums = stack(
  s("bd:2!4").bank("tr707").slow(2).postgain(volumeBD).orbit(2),
  s("clap:21").beat("4,12", 16).room(0.2).rsize(1).postgain(volumeClap).orbit(2).cut(1),
  s("sd:14").beat("4,12", 16).postgain(volumeSD).orbit(2),
  s("sd:5").bank("tr707").beat("4,12", 16).room(0.2).rsize(5).postgain(volumeSD).orbit(2),
  s("hh:1").beat("1,3,5,7", 8).postgain(volumeHH).orbit(3),
)

const drumRoll = stack(
  s("bd:2").beat("0,1,2,3,6,8,12,14", 16).bank("tr707").fast(2).postgain(volumeBD).orbit(2),
  s("sd:14").beat("0,1,2,3,6,8,12,14", 16).fast(2).postgain(volumeSD.mul(0.5)).orbit(2),
  s("sd:5").bank("tr707").beat("0,1,2,3,6,8,12,14", 16).fast(2).room(0.2).rsize(5).postgain(volumeSD.mul(0.5)).orbit(2),
)

const reese = stack(
    s("sine").lpf(60),
    s("supersaw").detune("<-.25,.12>").unison(3).hpf(60).lpf(slider(225, 0, 1000))
  )
  .n("<0 2 4 1>").scale(key)
  .clip(1)
  .postgain(volumeReese)
  .orbit(3)

const basslineMelody = n(`
    <[~ 0!3 ~ ~ 0 ~]*2>
`.add("<1 3 7 2>").sub(8))
  .scale(key);
const bassline =
  stack(
    basslineMelody
      .s("sine")
      .lpf(slider(267.32, 0, 3260))
      .attack(0)
      .decay(0.2)
      .lpf(60)
      .gain(0.8),
    basslineMelody
      .s("supersaw")
      .detune("<-.1, .1>")
      .unison(3)
      .hpf(60)
      .lpf(slider(606.36, 0, 3260))
      .lpd(0.05)
      .lpenv(2)
      .attack(0)
      .decay(0.2),
    basslineMelody
      .s("supersaw")
      .detune("<-.1, .1, .15>")
      .unison(3)
      .room(0.8)
      .rsize(0.5)
      .hpf(slider(622, 0, 2000))
      .hpd(0.2)
      .hpenv(2)
      .lpf(slider(1489.82, 0, 3260))
      .lpd(0.05)
      .lpenv(1)
      .attack(0)
      .decay(0.2)
  )
  .clip(1)
  .postgain(volumeBassline)
  .orbit(3)


const rbasslineMelody = n("<[~ 0!3]*4>".add("<1 3 7 2>").sub(8))
  .scale(key)
const rbassline =
  stack(
    rbasslineMelody
      .s("sine")
      .lpf(slider(267.32, 0, 3260))
      .attack(0)
      .decay(0.1)
      .lpf(60)
      .gain(0.8),
    rbasslineMelody
      .s("supersaw")
      .detune("<-.1, .1>")
      .unison(3)
      .hpf(60)
      .lpf(slider(945.4, 0, 3260))
      .lpd(0.05)
      .lpenv(2)
      .attack(0)
      .decay(0.2),
    rbasslineMelody
      .s("supersaw")
      .detune("<-.1, .1, .15>")
      .unison(3)
      .room(0.8)
      .rsize(0.5)
      .hpf(slider(622, 0, 2000))
      .hpd(0.2)
      .hpenv(2)
      .lpf(slider(1287.7, 0, 3260))
      .lpd(0.05)
      .lpenv(0.5)
      .attack(0)
      .decay(0.1)
  )
  .clip(1)
  .postgain(volumeBassline)
  .orbit(3)
  
const pads = n(`
  <
    <0,7,9,11>
    <2,9,11,13>
    <4,8,11,13>
    <1,8,10,[13@2 12 11]>
  >
`.add(7))
  .clip(1)
  .scale(key)
  .s("gm_lead_7_fifths")
  .adsr(".3:.3:0.6:.4")
  .hpf(250)
  .lpf(slider(2763, 0, 3000))
  .add(note("0,.07,-.1"))
  .room(1.5)
  .postgain(volumePads)
  .orbit(3)

const choirs = n(`
  <<0,2,4> <2,4,6> <1,4,6> <1,3,[6@2 5 4]>>
`.add(14))
  .clip(1)
  .scale(key)
  .s("gm_synth_choir:0")
  .adsr(".3:.3:0.6:.4")
  .hpf(slider(460, 100, 1000))
  .lpf(slider(4026, 0, 6000))
  .add(note("0,.07"))
  .pan(.7)
  .room(1.5)
  .postgain(volumeChoirs)
  .orbit(3)




const leadMelody = `<
  0 2 4 2 ~ 1 2 2 0 2 4 2 ~ 1 2 2
  0 2 6 2 0 2 6 2 0 2 6 2 ~ 1 4 2
  -1 1 4 1 ~ 0 1 1 -1 1 4 1 ~ 0 1 1
  1 3 6 3 1 3 6 3 3@2 ~ 5@2 ~ 4@2
>`;

const lead = n(leadMelody.add(21))
  .fast(16)
  .scale(key)
  .add(note("-.01,.07"))
  .layer(
    x => x.s("gm_synth_choir:0")
      .adsr("0:.2:0.2:0")
      .hpf(slider(1184, 0, 4000))
      .lpf(slider(4524, 0, 6000))
      .lpd(0.1).lpenv(0.2),
    x => x.s("gm_synth_choir:0")
      .s("gm_synth_choir:2")
      .adsr(".4:.3:0.6:.4")
      .hpf(slider(1016, 0, 4000))
      .lpf(slider(2652, 0, 6000))
      .lpd(0.1).lpenv(0.2)
      .gain(1.2)
  )
  .pan("<.4,.7>")
  .room(1.5)
  .postgain(volumeLead)

const pluck = n(leadMelody.add(note(".11,.17")))
  .s("gm_synth_bass_1:1")
  .adsr("0:.2:0.2:0")
  .lpf(slider(3900, 0, 6000))
  .lpd(0.1).lpenv(0.4)
  //.pan("<.4,.7>")
  //.room(1.5)
  .postgain(volumePluck)

const synthfill = n(`<
  2@4 ~@2 7 8 9@4 ~@4
  1@4 ~@4 ~@2 3@2 5@2 4@2 
>`.add(14))
  .fast(8)
  .scale(key)
  .s("supersaw")
  .unison(3)
  .detune("<-.1,.2>")
  .adsr("0.2:.4:0.2:0.1")
  .lpf(slider(1634, 1000, 3000)).lpd(0.2).lpenv(3).lpq(4)
  .delay(0.3).dfb(0.3)
  .pan(0.3)
  .postgain(volumeSynthFill)
  //.orbit(3)

const synthbreak = n(`<
  [~ 2]!8 [~ 1]!8 
>`.add(21)).fast(4).scale(key)
  .s("sine,square")
  .adsr("0.01:.8:0.2:0.1")
  .hpf(slider(379, 0, 1000))
  .lpf(slider(385.3, 100, 1000)).lpd(0.2).lpenv(1).lpq(1)
  .room(5).rsize(0.7)
  .gain(0.3)
  .pan(0.3)
  .postgain(volumeSynthBreak)


// intro ends in half bar intro + half bar drum roll
const introLen = 15.5;
const ramp = saw.slow(introLen);
const intro = stack(
  drums.lpf(ramp.range(5000, 10000)).gain(ramp.range(0.3, 1.0)),
  bassline.lpf(ramp.range(300, 1500)).gain(ramp.range(0.3, 1.0)),
  pads.lpf(ramp.range(500, 2000)).gain(ramp.range(0.6, 1.0))
)

$timeline: arrange(
  [introLen, intro],
  [0.5, drumRoll],
  [4, stack(drums, rbassline, pads, lead, pluck)],
  [4, stack(drums, rbassline, pads, lead, pluck, choirs)],
  [8, stack(
    drums, rbassline, pads, choirs, synthfill,
    lead.postgain("<1@7 [1 0]>"),
    pluck.postgain("<1@7 [1 0]>"),
    drumRoll.postgain("<0@7 [0 1]>"),
  )],
  [8, stack(
    reese,
    pads,
    choirs,
    synthbreak
  )]
)