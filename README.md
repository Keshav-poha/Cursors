# Lite Cursor & 3D Effects 

✨ **An extremely lightweight, dependency-free React library for 3D perspective and coordinate-based interactions.**

`lite-cursor-effects` helps you easily build high-end, premium interactive layouts, cards, buttons, text, grids, and mouse overlays. By utilizing hardware-accelerated CSS variables, standard CSS transitions, and Native Canvas rendering, the entire package compiles down to **only ~7kB (gzipped)** with **0 external dependencies** (React and React DOM are peer dependencies).

---

## Key Features
- **0 external dependencies**: Strip out bulky framer-motion and spring systems.
- **Ultra-lightweight**: Tiny bundle footprint (~7.2kB gzipped) built using `microbundle`.
- **High Performance**: Employs `requestAnimationFrame` interpolation (lerp) and hardware-accelerated CSS transforms.
- **Sleek Customization**: Every effect exposes range sliders and color pickers for visual fine-tuning.
- **Default System Cursor Compatible**: Custom cursor overlays render alongside the default browser pointer without hiding it.

---

## Installation

```bash
npm install lite-cursor-effects
```

---

## Quick Start & Usage Examples

### 1. Cursor Trails & Overlays
A canvas particle fluid trail following the cursor, alongside smart snapping overlays.

```jsx
import { LiquidCursorTrail, BoundaryCursor, PlayPauseCursor } from 'lite-cursor-effects';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#09090b' }}>
      {/* 1. Cinematic Liquid Trail in the background */}
      <LiquidCursorTrail color1="#4a0008" color2="#d90429" blurDeviation="15" buoyancy={0.5} turbulence={1.2} />
      
      {/* 2. Boundary Snapping Cursor Overlay (Active when hovering buttons) */}
      <BoundaryCursor hoverColor="#d90429" defaultSize={20} boundaryPadding={12} />
      
      <main style={{ padding: '4rem', display: 'flex', gap: '2rem', zIndex: 10, position: 'relative' }}>
        <button className="boundary-target">Hover to Snap Boundary</button>
      </main>
    </div>
  );
}
```

### 2. Element Physics (Magnetic & 3D Tilt)
Apply physical attraction and rotation to specific elements.

```jsx
import { Magnetic, Tilt } from 'lite-cursor-effects';

function App() {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', padding: '2rem' }}>
      {/* Magnetic pull: pulls the button towards the pointer coordinates */}
      <Magnetic damping={0.25}>
        <button style={{ padding: '1rem 2rem' }}>Magnetic Button</button>
      </Magnetic>

      {/* 3D Tilt: rotates the element in 3D perspective towards the pointer */}
      <Tilt maxTilt={15}>
        <button style={{ padding: '1rem 2rem', borderColor: '#d90429' }}>3D Tilt Button</button>
      </Tilt>
    </div>
  );
}
```

### 3. 3D Cards & Text (Parallax, Gloss, Extrusion, Press, Slices)
Build layered 3D depth, specular light reflections, extruded shadow text, and pressable depth buttons.

```jsx
import { ParallaxCard, GlossCard, ExtrudedText, DepthButton, SliceCard } from 'lite-cursor-effects';

function App() {
  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* 3D Parallax Card: Offsets internal layers by reading `--mx` and `--my` variables */}
      <ParallaxCard maxTilt={15} style={{ width: '300px', height: '180px', background: '#111' }}>
        <h3 style={{ transform: 'translate3d(calc(var(--mx) * 20px), calc(var(--my) * 20px), 30px)' }}>
          Holographic Title
        </h3>
      </ParallaxCard>

      {/* Specular Gloss Card: Glowing reflection highlight following the cursor */}
      <GlossCard maxTilt={15} glossOpacity={0.25} style={{ width: '300px', height: '180px', background: '#222' }}>
        <span>Glossy Reflections</span>
      </GlossCard>

      {/* Extruded Text: 3D perspective text projecting shadow lines opposite to pointer */}
      <ExtrudedText text="DEPTH" extrusionLength={10} extrusionColor="#d90429" />

      {/* Depth Button: Extruded 3D button that physically pushes down along the Z-axis when clicked */}
      <DepthButton maxTilt={10} depth={8}>
        CLICK PRESS
      </DepthButton>

      {/* Slice Card: splits content into horizontal slices that separate in 3D Z depth on hover */}
      <SliceCard sliceSpacing={20} style={{ width: '300px', height: '180px' }}>
        <div style={{ background: '#333', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          Sliced Content
        </div>
      </SliceCard>
    </div>
  );
}
```

### 4. 3D Reveals (Flip, Hinge, Layer Scatter, Spotlight Border, Homing Orbit)
Swinging hinges, 3D flips, exploding Z layers, glowing spotlight outlines, and homing spring orbits.

```jsx
import { FlipCard, HingeReveal, LayerScatter, SpotlightBorder, OrbitSpring } from 'lite-cursor-effects';

function App() {
  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {/* 3D Flip Card: Flips 180 degrees along X/Y axis on hover or click */}
      <FlipCard
        axis="y"
        trigger="hover"
        width="260px"
        height="160px"
        frontContent={<div style={{ background: '#1f1f23', height: '100%' }}>Front Face</div>}
        backContent={<div style={{ background: '#d90429', height: '100%' }}>Back Face</div>}
      />

      {/* Hinge Reveal: Cover folds open 115 degrees on left/right/top/bottom hinges */}
      <HingeReveal
        hingeSide="left"
        revealAngle={115}
        width="260px"
        height="160px"
        coverContent={<div style={{ background: '#1f1f23', height: '100%' }}>🚪 Swings Open</div>}
        revealContent={<div style={{ background: '#111', height: '100%' }}>Secret details</div>}
      />

      {/* Layer Scatter: Spreads absolute child divs apart along the Z elevation axis on hover */}
      <LayerScatter scatterDepth={40} style={{ width: '260px', height: '160px' }}>
        <div style={{ background: '#111' }}>LAYER 1 (BASE)</div>
        <div style={{ background: 'rgba(217, 4, 41, 0.1)' }}>LAYER 2 (MID)</div>
        <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(5px)' }}>LAYER 3 (TOP)</div>
      </LayerScatter>

      {/* Spotlight Border: Renders glowing borders by tracking pointer coordinates */}
      <SpotlightBorder spotlightColor="rgba(217, 4, 41, 0.6)" borderWidth="1px" style={{ width: '260px', height: '160px' }}>
        <div style={{ padding: '2rem' }}>Highlight Border Card</div>
      </SpotlightBorder>

      {/* Orbit Spring: automatic orbit float animation that halts and tilts towards pointer on approach */}
      <OrbitSpring maxTilt={20} activeRadius={250}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#222' }}>🪐 Orbit</div>
      </OrbitSpring>
    </div>
  );
}
```

### 5. 3D Layouts (Isometric, Parallax Tunnels, Tilt Boards, Fans)
Arrange child elements in tilted grids, concentric depth tunnels, or fanned cards.

```jsx
import { IsometricElevator, IsometricElevatorItem, DepthTunnel, TiltBoard, TiltBoardItem, CardStack } from 'lite-cursor-effects';

function App() {
  return (
    <div style={{ padding: '4rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {/* Isometric Elevator: Cells rendered on an isometric plane, translating upwards on hover */}
      <IsometricElevator columns="repeat(3, 1fr)" gap="1rem">
        <IsometricElevatorItem liftAmount={25}><div>Item 1</div></IsometricElevatorItem>
        <IsometricElevatorItem liftAmount={25}><div>Item 2</div></IsometricElevatorItem>
        <IsometricElevatorItem liftAmount={25}><div>Item 3</div></IsometricElevatorItem>
      </IsometricElevator>

      {/* Depth Tunnel: concentric loops moving at staggered speeds, producing deep tunnel zoom */}
      <DepthTunnel maxOffset={25} layersCount={5} style={{ width: '100%', height: '200px' }}>
        <div style={{ color: '#d90429' }}>Tunnel End</div>
      </DepthTunnel>

      {/* Tilt Board: backward-tilted grid plane which warps and tilts cell items on hover */}
      <TiltBoard boardRotationX={20} maxTilt={10} columns="repeat(3, 1fr)" gap="1rem">
        <TiltBoardItem liftAmount={20}><div>Cell A</div></TiltBoardItem>
        <TiltBoardItem liftAmount={20}><div>Cell B</div></TiltBoardItem>
        <TiltBoardItem liftAmount={20}><div>Cell C</div></TiltBoardItem>
      </TiltBoard>

      {/* Card Stack: stacked deck of cards fanning out in X, Y, Z coordinates on hover */}
      <CardStack fanSpacing={45} liftSpacing={15} depthSpacing={20} style={{ width: '160px', height: '110px' }}>
        <div style={{ background: '#111' }}>Card A</div>
        <div style={{ background: '#222' }}>Card B</div>
        <div style={{ background: '#d90429' }}>Card C</div>
      </CardStack>
    </div>
  );
}
```

---

## API & Props Reference

### `<LiquidCursorTrail />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `color` | `string` | `undefined` | Single fallback solid/hex/rgb trail color |
| `color1` | `string` | `undefined` | Gradient start color (hex/rgb/rgba) |
| `color2` | `string` | `undefined` | Gradient end color (hex/rgb/rgba) |
| `colorStops` | `array` | `undefined` | Array of `{ offset, color }` custom canvas stops |
| `blurDeviation` | `string` | `"15"` | FeGaussianBlur stdDeviation (gooey factor) |
| `buoyancy` | `number` | `0.5` | Decelerating vertical drift speed (negative falls, positive floats) |
| `turbulence` | `number` | `1.0` | Random coordinate velocity scatter radius |

### `<BoundaryCursor />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selector` | `string` | `"a, button, .boundary-target"` | Targets that trigger boundary snapping |
| `hoverColor` | `string` | `"rgba(217, 4, 41, 0.4)"` | Outer border color on hover |
| `hoverBgColor` | `string` | `"rgba(217, 4, 41, 0.1)"` | Background fill color on hover |
| `defaultSize` | `number` | `20` | Size of the resting cursor circle (pixels) |
| `boundaryPadding` | `number` | `16` | Snapping outline padding around target element |

### `<PlayPauseCursor />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selector` | `string` | `".video-hover-target"` | Target selectors representing video player containers |
| `videoColor` | `string` | `"#F4F4F5"` | Text and play/pause icon colors |
| `videoBgColor` | `string` | `"rgba(255, 255, 255, 0.05)"` | Capsule pill background fill |
| `videoBorderColor` | `string` | `"rgba(255, 255, 255, 0.15)"` | Capsule pill border outline |
| `pillWidth` | `number` | `105` | Width of expanded capsule (pixels) |
| `pillHeight` | `number` | `44` | Height of expanded capsule (pixels) |

### `<Magnetic />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `damping` | `number` | `0.25` | Linear interpolation coordinate tracking speed |
| `transitionSpeed`| `string` | `"0.4s"` | Reset transition speed when pointer leaves element |

### `<Tilt />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `15` | Maximum tilt/rotation angle (degrees) |

### `<ParallaxCard />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `15` | Maximum tilt/rotation angle (degrees) |
| `perspective` | `number` | `1000` | 3D perspective depth camera distance |
| `transitionSpeed` | `string` | `"0.3s"` | Reset transition speed when pointer leaves card |

### `<GlossCard />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `15` | Maximum tilt/rotation angle (degrees) |
| `glossOpacity` | `number` | `0.15` | Opacity of pointer specular glare highlight (0.0 - 1.0) |

### `<ExtrudedText />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `text` | `string` | *Required* | Text characters to render and extrude |
| `maxTilt` | `number` | `20` | Maximum tilt/rotation angle (degrees) |
| `extrusionLength` | `number` | `8` | Text-shadow extrusion depth limit (pixels) |
| `extrusionColor` | `string` | `"#d90429"` | Shadow line fill color |

### `<DepthButton />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `10` | Maximum tilt/rotation angle (degrees) |
| `depth` | `number` | `8` | Physical depth side face thickness (pixels) |
| `buttonBg` | `string` | `"#d90429"` | Button surface fill color |
| `buttonDepthBg` | `string` | `"#8a041a"` | Extruded bottom depth face fill color |

### `<SliceCard />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `15` | Maximum tilt/rotation angle (degrees) |
| `sliceSpacing` | `number` | `20` | Depth spacing separating slices along Z axis (pixels) |

### `<FlipCard />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `frontContent` | `ReactNode` | *Required* | Element layout rendered on the front face |
| `backContent` | `ReactNode` | *Required* | Element layout rendered on the back face |
| `axis` | `string` | `"y"` | Axis to rotate along (`"x"` or `"y"`) |
| `trigger` | `string` | `"hover"` | Flip trigger gesture (`"hover"` or `"click"`) |

### `<HingeReveal />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `coverContent` | `ReactNode` | *Required* | Door swing face layout |
| `revealContent` | `ReactNode` | *Required* | Hidden background contents layout |
| `hingeSide` | `string` | `"left"` | Origin of hinge border (`"left"`, `"right"`, `"top"`, `"bottom"`) |
| `revealAngle` | `number` | `115` | Open swing angle (degrees) |

### `<LayerScatter />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `15` | Maximum tilt/rotation angle (degrees) |
| `scatterDepth` | `number` | `40` | Translation Z gap between overlapping children layers (pixels) |

### `<SpotlightBorder />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `12` | Maximum tilt/rotation angle (degrees) |
| `spotlightColor` | `string` | `"rgba(217, 4, 41, 0.6)"` | Glowing radial border highlight color |
| `borderWidth` | `string` | `"1px"` | Thickness of the outer glowing border frame |

### `<PerspectiveGridItem />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `20` | Maximum tilt/rotation angle (degrees) |
| `activeRadius` | `number` | `300` | Global pointer detection influence radius (pixels) |
| `liftAmount` | `number` | `15` | Z-axis elevation lift (pixels) |

### `<OrbitSpring />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `20` | Maximum tilt/rotation angle (degrees) |
| `activeRadius` | `number` | `250` | Pointer influence radius to halt float loop and lock focus (pixels) |

### `<IsometricElevatorItem />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `liftAmount` | `number` | `24` | 3D Z elevation lift (pixels) on hover |

### `<DepthTunnel />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `layersCount` | `number` | `5` | Concentric box border frames to draw |
| `maxOffset` | `number` | `25` | Maximum offset shift for the center focus layer (pixels) |

### `<TiltBoard />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `maxTilt` | `number` | `10` | Mouse board tilt strength factor |
| `boardRotationX` | `number` | `20` | Default backward board pitch angle (degrees) |

### `<TiltBoardItem />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `liftAmount` | `number` | `20` | Z elevation lift (pixels) on cell hover |

### `<CardStack />`
| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fanSpacing` | `number` | `45` | Horizontal fan out separation distance (pixels) |
| `liftSpacing` | `number` | `15` | Arc elevation lift displacement (pixels) |
| `depthSpacing` | `number` | `20` | Z scatter separation between fanning cards (pixels) |

---

## Contributing

See our [Contributing Guidelines](CONTRIBUTING.md) to learn how to run the project locally and submit Pull Requests.

---

## License

MIT License. Feel free to use this library in personal or commercial projects.
