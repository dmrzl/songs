// @title Synthwave T2
// @by dmrzl
// @license CC0

setcpm(80/4)

// C# D# E F# G# A B
const key = "C#2:minor"

const volumeBD = slider(0.702, 0.0, 1.0)
const volumeBDSub = slider(1, 0.0, 1.0)
const volumeClap = slider(0.274, 0.0, 1.0)
const volumeSD = slider(0.164, 0.0, 1.0)
const volumeHH = slider(0.87, 0.0, 1.0)
const volumeDrums = slider(0.145, 0.0, 1.0)
const volumeDrumRoll = slider(0.314, 0.0, 1.0)

const volumeReese = slider(1.54, 0.0, 2.0)
const volumeBassline = slider(2.004, 0.0, 3.0)
const volumePads = slider(0.274, 0.0, 2.0)
const volumeChoirs = slider(0.472, 0.0, 2.0)
const volumeLead = slider(0.4, 0.0, 2.0)
const volumePluck = slider(0.249, 0.0, 1.0)
const volumeSynthFill = slider(0.434, 0.0, 2.0)
const volumeSynthBreak = slider(0.2, 0.0, 2.0)

const volumeAmbient = slider(0.3, 0.0, 1.0)
const volumeSwoosh = slider(0.306, 0.0, 2.0)


////////////////////////////////////////////////////
/// DRUMS ///////////////////////////////////////////
////////////////////////////////////////////////////

$sc: s("sd:4!8").slow(2).decay(0.5).duck("3").duckattack(0.4).duckdepth(0.7).postgain(0)

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

////////////////////////////////////////////////////
/// BASS ///////////////////////////////////////////
////////////////////////////////////////////////////

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
    // basslineMelody
    //   .s("sine")
    //   .lpf(slider(114.1, 0, 3260))
    //   .attack(0)
    //   .decay(0.1)
    //   .lpf(60),
    basslineMelody
      .s("supersaw")
      .detune("<-.1>")
      .unison(3)
      .hpf(slider(48.6, 0, 200))//.hpd(0.1)
      .lpf(slider(306.18, 0, 1260)).lpd(0.1).lpenv(.4)
      .adsr("0:.2:.1:0")
      .gain(1.0),
    basslineMelody
      .s("tri")
      .detune("<-.1>")
      .unison(3)
      .room(0.4).rsize(0.6)
      .hpf(slider(100.5, 0, 500)).hpd(0.1).hpenv(1)
      .lpf(slider(1131.22, 0, 3260)).lpd(0.1).lpenv(3).lpq(1)
      .adsr("0:.15:.5:0")
      .gain(2.0)
  )
  .clip(1)
  .postgain(volumeBassline)
  .orbit(3)


const rbasslineMelody = n("<[~ 0!3]*4>".add("<1 3 7 2>").sub(8))
  .scale(key)
const rbassline =
  stack(
    // rbasslineMelody
    //   .s("sine")
    //   .lpf(slider(114.1, 0, 3260))
    //   .attack(0)
    //   .decay(0.1)
    //   .lpf(60),
    rbasslineMelody
      .s("supersaw")
      .detune("<-.1>")
      .unison(3)
      .hpf(slider(48.6, 0, 200))//.hpd(0.1)
      .lpf(slider(306.18, 0, 1260)).lpd(0.1).lpenv(.4)
      .adsr("0:.2:.1:0")
      .gain(1.0),
    rbasslineMelody
      .s("tri")
      .detune("<-.1>")
      .unison(3)
      .room(0.4).rsize(0.6)
      .hpf(slider(100.5, 0, 500)).hpd(0.1).hpenv(1)
      .lpf(slider(1131.22, 0, 3260)).lpd(0.1).lpenv(3).lpq(1)
      .adsr("0:.15:.5:0")
      .gain(2.0)
  )
  .clip(1)
  .postgain(volumeBassline)
  .orbit(3)

////////////////////////////////////////////////////
/// PADS ///////////////////////////////////////////
////////////////////////////////////////////////////
  
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
  .adsr(".3:.3:0.6:.5")
  .hpf(slider(957.8, 200, 2000))
  .lpf(slider(2262, 0, 3000))
  .add(note("0,.07,-.1"))
  .room(1.5)
  .postgain(volumePads)
  .orbit(3)

const choirs = n(`
  <<0,2,4> <2,4,6> <1,4,6> <1,3,[6@2 5 4]>>
`.add(14))
  .scale(key)
  .s("gm_synth_choir:0.5")
  .adsr(".3:.3:0.6:.9")
  .hpf(slider(272.8, 100, 1000))
  .lpf(slider(1092, 1000, 3000))
  .add(note("0,.07"))
  .pan(.7)
  .room(1.5)
  .postgain(volumeChoirs)
  .orbit(3)

////////////////////////////////////////////////////
/// MELODY /////////////////////////////////////////
////////////////////////////////////////////////////

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
  ._pianoroll()

const pluck = n(leadMelody.add(".11,.17"))
  .fast(16)
  .s("gm_synth_bass_1:7")
  // .s("gm_synth_bass_1:1")
  .adsr("0:.2:0.02:0")
  .hpf(slider(820.1, 100, 2000))
  .lpf(slider(4398, 0, 6000))
  .lpd(0.1).lpenv(0.4)
  .pan("<.4,.7>")
  .delay(0.2).delayfb(0.4)
  .room(1.2)
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
  ._pianoroll()

const synthbreak = n(`<
  [~ 2]!8 [~ 1]!8 
>`.add(21)).fast(4).scale(key)
  .add(note("-.1,.1"))
  .layer(
    x => x
      .s("gm_lead_7_fifths:0")
      .adsr("0:.1:.5:0.1")
      .hpf(slider(306, 0, 1000))
      .lpf(slider(843.4, 100, 1000))
      .gain(1),
    x => x
      .s("square")
      .adsr("0.0:.1:0.25:0")
      .hpf(slider(535, 0, 1000))
      .lpf(slider(730.9, 100, 1000)).lpd(0.6).lpenv(2).lpq(1)
      .gain(1),
    x => x
      .s("gm_synth_choir:2")
      .adsr("0.01:.9:1:0.1")
      .hpf(slider(389, 0, 1000)).hpd(0.5).hpenv(-3).hpq(3)
      .lpf(slider(806.5, 100, 1000)).lpd(0.3).lpenv(-2).lpq(9)
      .gain(0.6),

  ) 
  .delay(0.8).delayfb(.75)
  .room(4).rsize(0.4)
  .pan(0.3)
  .postgain(volumeSynthBreak)

////////////////////////////////////////////////////
/// SUPPORT SOUNDS /////////////////////////////////
////////////////////////////////////////////////////

const noiseType = "pink"
const swooshUpShort = s(noiseType)
  .clip(1)
  .lpf(200)
  .lpa(2).lps(1).lpr(0)
  .lpenv(8)
  .room(0.4).roomsize(0.5)
  .gain(volumeSwoosh)

const swooshUp = s(noiseType)
  .clip(1)
  .lpf(200)
  .lpa(4).lps(1).lpr(0)
  .lpenv(8)
  .room(0.4).roomsize(0.5)
  .gain(volumeSwoosh)

const swooshDown = s(noiseType)
  .clip(1)
  .lpf(200)
  .lpa(3).lps(1).lpr(0)
  .lpenv(-8)
  .room(0.4).roomsize(0.5)
  .gain(volumeSwoosh)

const ambient = note("f#4").s("gm_pad_choir:3")
  .adsr("0:1:1:.4")
  .cut(1)
  .hpr(slider(540, 0, 5000))
  .lpf(slider(1585, 0, 5000))
  .phaser(0.9)
  .room(2).roomsize(1.4)
  .postgain(volumeAmbient)
  .orbit(3)

////////////////////////////////////////////////////
/// SONG STRUCTURE /////////////////////////////////
////////////////////////////////////////////////////

const introRamp = saw.slow(8);
const leadRamp = saw.slow(4)
$timeline: arrange(
  [8, stack(
    drums.lpf(introRamp.range(5000, 10000)).gain(introRamp.range(0.3, 1.0)).mask("<1@7 [1 0]>"),
    bassline.lpf(introRamp.range(300, 1500)).gain(introRamp.range(0.3, 1.0)).mask("<1@7 [1 0]>"),
    pads.lpf(introRamp.range(500, 2000)).gain(introRamp.range(0.6, 1.0)).mask("<1@7 [1 0]>"),
    drumRoll.mask("<0@7 [0 1]>"),
    swooshUpShort.mask("<0@7 1>")
  )],
  [4, stack(
    swooshDown.mask("<1 0@3>"),
    ambient,
    drums,
    rbassline,
    pads,
    lead,
    pluck,    
  )],
  [4, stack(
    drums,
    ambient,
    rbassline,
    pads,
    lead,
    pluck,
    choirs,
    swooshUpShort.mask("<0@3 1>")
  )],
  [8, stack(
    swooshDown.mask("<1 0@7>"),
    ambient,
    drums,
    rbassline,
    pads,
    choirs,
    synthfill,
    lead.mask("<1@7 [1 0]>"),
    pluck.mask("<1@7 [1 0]>"),
    drumRoll.mask("<0@7 [0 1]>"),
    swooshUp.mask("<0@7 1>")
  )],
  [4, stack(
    swooshDown.mask("<1 0@3>"),
    ambient,
    reese,
    pads,
    choirs,
    synthbreak
  )],
  [4, stack(
    ambient,
    reese.mask("<1@4 0>"),
    pads.mask("<1@4 0>").room(leadRamp.range(1.5, 0)).release(0),
    choirs.mask("<1@4 0>").room(leadRamp.range(1.5, 0)).release(0),
    synthbreak.mask("<1@4 0>").postgain(leadRamp.range(volumeSynthBreak, volumeSynthBreak.mul(0.4))),
    lead.lpf(leadRamp.range(1000,2000).postgain(leadRamp.range(volumeLead.mul(0.3), volumeLead))),
    swooshUp.mask("<0@3 1>")
  )],
  [8, stack(
    swooshDown.mask("<1 0@3>"),
    ambient,
    drums,
    rbassline,
    pads,
    choirs.mask("<0@2 1@6>"),
    lead,
    pluck,
    synthfill.mask("<0@4 1@4>"),
    drumRoll.mask("<0@7 [0 1]>"),
    swooshUp.mask("<0@3 1>")
  )],
  [4, stack(
    swooshDown.mask("<1 0@3>"),
    ambient,
    reese,
    choirs.release(4),
    lead.postgain(leadRamp.range(volumeLead.mul(0.6), 0)).room(5.5)
  )],
  [8, silence]
)