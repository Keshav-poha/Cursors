import { useState } from 'react'
import {
  BoundaryCursor,
  PlayPauseCursor,
  Magnetic,
  Tilt,
  LiquidCursorTrail,
  ParallaxCard,
  GlossCard,
  ExtrudedText,
  DepthButton,
  FlipCard,
  HingeReveal,
  LayerScatter,
  SpotlightBorder,
  PerspectiveGrid,
  PerspectiveGridItem,
  OrbitSpring,
  IsometricElevator,
  IsometricElevatorItem,
  DepthTunnel,
  SliceCard,
  TiltBoard,
  TiltBoardItem,
  CardStack,
  LiquidDistortionCursor
} from '../../src/index.js'

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('cursors'); // 'cursors' | 'physics' | 'cards-text' | 'reveals' | 'layouts'

  // Panel hover states for cursor overlays
  const [isHoveringBoundaryPanel, setIsHoveringBoundaryPanel] = useState(false);
  const [isHoveringPlayPausePanel, setIsHoveringPlayPausePanel] = useState(false);
  const [isHoveringLiquidDistortionPanel, setIsHoveringLiquidDistortionPanel] = useState(false);

  // --- States for Customization Properties ---
  // 1. Liquid Trail
  const [liquidColor1, setLiquidColor1] = useState('#4a0008');
  const [liquidColor2, setLiquidColor2] = useState('#d90429');
  const [liquidBlur, setLiquidBlur] = useState(15);
  const [liquidBuoyancy, setLiquidBuoyancy] = useState(0.5);
  const [liquidTurbulence, setLiquidTurbulence] = useState(1.0);

  // 1b. Liquid Distortion Cursor
  const [liquidDistortionRadius, setLiquidDistortionRadius] = useState(200);
  const [liquidDistortionAmount, setLiquidDistortionAmount] = useState(25);
  const [liquidDistortionFreq, setLiquidDistortionFreq] = useState(0.015);
  const [liquidDistortionSpeed, setLiquidDistortionSpeed] = useState(8);

  // 2. Boundary Snapping
  const [boundaryColor, setBoundaryColor] = useState('#d90429');
  const [boundarySize, setBoundarySize] = useState(20);
  const [boundaryPadding, setBoundaryPadding] = useState(16);

  // 3. Play/Pause Hover
  const [videoPillWidth, setVideoPillWidth] = useState(105);
  const [videoPillHeight, setVideoPillHeight] = useState(44);
  const [videoColor, setVideoColor] = useState('#ffffff');
  const [videoBgColor, setVideoBgColor] = useState('rgba(255, 255, 255, 0.05)');

  // 4. Magnetic Element
  const [elementDamping, setElementDamping] = useState(0.25);

  // 5. Tilt Element
  const [elementMaxTilt, setElementMaxTilt] = useState(15);

  // 6. Perspective Grid
  const [gridMaxTilt, setGridMaxTilt] = useState(20);
  const [gridLiftAmount, setGridLiftAmount] = useState(15);
  const [gridActiveRadius, setGridActiveRadius] = useState(250);

  // 7. Parallax Card
  const [parallaxMaxTilt, setParallaxMaxTilt] = useState(15);

  // 8. Gloss Card
  const [glossMaxTilt, setGlossMaxTilt] = useState(15);
  const [glossOpacity, setGlossOpacity] = useState(0.2);

  // 9. Extruded Text
  const [extrusionLength, setExtrusionLength] = useState(8);
  const [extrusionColor, setExtrusionColor] = useState('#d90429');

  // 10. Depth Button
  const [depthButtonMaxTilt, setDepthButtonMaxTilt] = useState(10);
  const [buttonDepth, setButtonDepth] = useState(8);

  // 11. Slice Card
  const [sliceSpacing, setSliceSpacing] = useState(20);

  // 12. Flip Card
  const [flipAxis, setFlipAxis] = useState('y'); // 'x' | 'y'
  const [flipTrigger, setFlipTrigger] = useState('hover'); // 'hover' | 'click'

  // 13. Hinge Reveal
  const [hingeSide, setHingeSide] = useState('left'); // 'left' | 'right' | 'top' | 'bottom'
  const [hingeAngle, setHingeAngle] = useState(115);

  // 14. Layer Scatter
  const [scatterDepth, setScatterDepth] = useState(40);

  // 15. Spotlight Border
  const [spotlightColor, setSpotlightColor] = useState('#d90429');
  const [spotlightMaxTilt, setSpotlightMaxTilt] = useState(12);

  // 16. Orbit Spring
  const [orbitMaxTilt, setOrbitMaxTilt] = useState(20);
  const [orbitRadius, setOrbitRadius] = useState(250);

  // 17. Isometric Elevator
  const [isometricLift, setIsometricLift] = useState(24);

  // 18. Depth Tunnel
  const [tunnelOffset, setTunnelOffset] = useState(25);
  const [tunnelLayers, setTunnelLayers] = useState(5);

  // 19. Tilt Board
  const [boardTilt, setBoardTilt] = useState(10);
  const [boardRotX, setBoardRotX] = useState(20);
  const [boardLift, setBoardLift] = useState(20);

  // 20. Card Stack
  const [stackFan, setStackFan] = useState(45);
  const [stackLift, setStackLift] = useState(15);
  const [stackDepth, setStackDepth] = useState(20);

  const toggleVideo = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    const event = new CustomEvent('video-play-toggle', { detail: { isPlaying: nextState } });
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Dynamic Cursor Renderers (conditional on category/hover) */}
      {activeCategory === 'cursors' && isHoveringBoundaryPanel && (
        <BoundaryCursor
          hoverColor={boundaryColor}
          hoverBgColor={`${boundaryColor}1a`}
          defaultSize={boundarySize}
          boundaryPadding={boundaryPadding}
        />
      )}

      {activeCategory === 'cursors' && isHoveringPlayPausePanel && (
        <PlayPauseCursor
          videoColor={videoColor}
          videoBgColor={videoBgColor}
          videoBorderColor={`${videoColor}26`}
          defaultSize={20}
          pillWidth={videoPillWidth}
          pillHeight={videoPillHeight}
        />
      )}

      {activeCategory === 'cursors' && isHoveringLiquidDistortionPanel && (
        <LiquidDistortionCursor
          radius={liquidDistortionRadius}
          distortionAmount={liquidDistortionAmount}
          baseFrequency={liquidDistortionFreq}
          speed={liquidDistortionSpeed}
        />
      )}

      <header className="header">
        <h1 className="title">Lite Cursor Effects</h1>
        <p className="subtitle">An extremely lightweight React library for 3D and coordinate-based interactions.</p>
        
        {/* Main Category Tabs */}
        <div className="category-navigation">
          <button 
            className={`nav-btn ${activeCategory === 'cursors' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cursors')}
          >
            Cursors & Trails
          </button>
          <button 
            className={`nav-btn ${activeCategory === 'physics' ? 'active' : ''}`}
            onClick={() => setActiveCategory('physics')}
          >
            Physics & Warp
          </button>
          <button 
            className={`nav-btn ${activeCategory === 'cards-text' ? 'active' : ''}`}
            onClick={() => setActiveCategory('cards-text')}
          >
            3D Cards & Text
          </button>
          <button 
            className={`nav-btn ${activeCategory === 'reveals' ? 'active' : ''}`}
            onClick={() => setActiveCategory('reveals')}
          >
            3D Reveals & Orbit
          </button>
          <button 
            className={`nav-btn ${activeCategory === 'layouts' ? 'active' : ''}`}
            onClick={() => setActiveCategory('layouts')}
          >
            3D Layouts & Stacks
          </button>
        </div>
      </header>

      <main className="panels-container">
        
        {/* =========================================================================
            CATEGORY 1: CURSORS & TRAILS
           ========================================================================= */}
        {activeCategory === 'cursors' && (
          <>
            {/* Panel 1: Liquid Trail */}
            <div className="panel-card">
              <div className="panel">
                <h2 className="panel-title">1. Liquid Trail</h2>
                <p className="panel-desc">Fluid particles flowing relative to system pointer movement.</p>
                <div className="liquid-container">
                  <LiquidCursorTrail 
                    color1={liquidColor1} 
                    color2={liquidColor2} 
                    blurDeviation={liquidBlur.toString()} 
                    buoyancy={liquidBuoyancy}
                    turbulence={liquidTurbulence}
                  />
                </div>
              </div>
              <div className="panel-controls">
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                  <div className="control-group" style={{ flex: 1 }}>
                    <label>Gradient Start</label>
                    <input type="color" value={liquidColor1} onChange={e => setLiquidColor1(e.target.value)} />
                  </div>
                  <div className="control-group" style={{ flex: 1 }}>
                    <label>Gradient End</label>
                    <input type="color" value={liquidColor2} onChange={e => setLiquidColor2(e.target.value)} />
                  </div>
                </div>
                <div className="control-group">
                  <label>Fluid Blur: {liquidBlur}px</label>
                  <input type="range" min="5" max="40" value={liquidBlur} onChange={e => setLiquidBlur(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Gravity / Buoyancy: {liquidBuoyancy}</label>
                  <input type="range" min="-2" max="2" step="0.1" value={liquidBuoyancy} onChange={e => setLiquidBuoyancy(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Turbulence / Drift: {liquidTurbulence}</label>
                  <input type="range" min="0" max="5" step="0.1" value={liquidTurbulence} onChange={e => setLiquidTurbulence(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 2: Boundary Snapping */}
            <div className="panel-card">
              <div 
                className="panel"
                onMouseEnter={() => setIsHoveringBoundaryPanel(true)}
                onMouseLeave={() => setIsHoveringBoundaryPanel(false)}
              >
                <h2 className="panel-title">2. Boundary Snapping</h2>
                <p className="panel-desc">A cursor frame overlay that snaps onto button borders on hover.</p>
                <div style={{ zIndex: 10 }}>
                  <button className="btn boundary-target" style={{ padding: '0.75rem 2rem' }}>
                    Snap Boundary Target
                  </button>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Size: {boundarySize}px</label>
                  <input type="range" min="10" max="50" value={boundarySize} onChange={e => setBoundarySize(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Padding: {boundaryPadding}px</label>
                  <input type="range" min="0" max="40" value={boundaryPadding} onChange={e => setBoundaryPadding(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Hover Frame Color</label>
                  <input type="color" value={boundaryColor} onChange={e => setBoundaryColor(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Panel 3: Play/Pause Hover */}
            <div className="panel-card">
              <div 
                className="panel"
                onMouseEnter={() => setIsHoveringPlayPausePanel(true)}
                onMouseLeave={() => setIsHoveringPlayPausePanel(false)}
              >
                <h2 className="panel-title">3. Play/Pause Action</h2>
                <p className="panel-desc">Morphs into a media action capsule when hovering over players.</p>
                <div style={{ zIndex: 10 }}>
                  <div 
                    className="video-mockup video-hover-target" 
                    data-playing={isPlaying}
                    onClick={toggleVideo}
                  >
                    {isPlaying ? "PLAYING..." : "MOCK VIDEO"}
                  </div>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Pill Width: {videoPillWidth}px</label>
                  <input type="range" min="80" max="150" value={videoPillWidth} onChange={e => setVideoPillWidth(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Pill Height: {videoPillHeight}px</label>
                  <input type="range" min="30" max="60" value={videoPillHeight} onChange={e => setVideoPillHeight(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Pill Color</label>
                  <input type="color" value={videoColor} onChange={e => setVideoColor(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Panel 3b: Liquid Distortion */}
            <div className="panel-card">
              <div 
                className="panel"
                onMouseEnter={() => setIsHoveringLiquidDistortionPanel(true)}
                onMouseLeave={() => setIsHoveringLiquidDistortionPanel(false)}
                style={{ overflow: 'hidden' }}
              >
                <h2 className="panel-title">4. Liquid Distortion</h2>
                <p className="panel-desc">SVG backdrop filter that warps DOM text and images like a magnifying liquid drop.</p>
                <div style={{ zIndex: 10, padding: '2rem', background: 'linear-gradient(45deg, #18181b, #27272a)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>HOVER ME</h3>
                  <p style={{ color: '#a1a1aa' }}>Watch the text refract!</p>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Lens Radius: {liquidDistortionRadius}px</label>
                  <input type="range" min="100" max="400" value={liquidDistortionRadius} onChange={e => setLiquidDistortionRadius(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Distortion Amount: {liquidDistortionAmount}</label>
                  <input type="range" min="5" max="100" value={liquidDistortionAmount} onChange={e => setLiquidDistortionAmount(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Wave Scale: {liquidDistortionFreq.toFixed(3)}</label>
                  <input type="range" min="0.005" max="0.05" step="0.001" value={liquidDistortionFreq} onChange={e => setLiquidDistortionFreq(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            CATEGORY 2: PHYSICS & WARP
           ========================================================================= */}
        {activeCategory === 'physics' && (
          <>
            {/* Panel 4: Magnetic Element */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">4. Magnetic Element</h2>
                <p className="panel-desc">Wrapper element that slides smoothly towards the pointer.</p>
                <div style={{ zIndex: 10 }}>
                  <Magnetic damping={elementDamping}>
                    <button className="btn" style={{ padding: '1rem 3rem' }}>
                      Magnetic Target
                    </button>
                  </Magnetic>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Magnetic Pull Damping: {elementDamping}</label>
                  <input type="range" min="0.05" max="0.5" step="0.05" value={elementDamping} onChange={e => setElementDamping(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 5: Tilt Element */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">5. Tilt Element</h2>
                <p className="panel-desc">Wrapper element that rotates/tilts in 3D perspective towards the pointer.</p>
                <div style={{ zIndex: 10 }}>
                  <Tilt maxTilt={elementMaxTilt}>
                    <button className="btn" style={{ padding: '1rem 3rem', borderColor: '#d90429' }}>
                      3D Tilt Button
                    </button>
                  </Tilt>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Maximum Tilt: {elementMaxTilt}°</label>
                  <input type="range" min="5" max="60" value={elementMaxTilt} onChange={e => setElementMaxTilt(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 6: Perspective Grid Warp */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 className="panel-title">6. Grid Perspective Warp</h2>
                <p className="panel-desc">Grid cells dynamically lift and tilt towards global coordinates.</p>
                
                <div style={{ zIndex: 10, width: '100%', marginTop: '3.5rem' }}>
                  <PerspectiveGrid columns="repeat(4, 1fr)" gap="0.5rem">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <PerspectiveGridItem 
                        key={i} 
                        maxTilt={gridMaxTilt} 
                        liftAmount={gridLiftAmount}
                        activeRadius={gridActiveRadius}
                      >
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '8px',
                          aspectRatio: '1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          color: '#71717a'
                        }}>
                          {i + 1}
                        </div>
                      </PerspectiveGridItem>
                    ))}
                  </PerspectiveGrid>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Grid Cell Tilt: {gridMaxTilt}°</label>
                  <input type="range" min="10" max="45" value={gridMaxTilt} onChange={e => setGridMaxTilt(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Grid Lift: {gridLiftAmount}px</label>
                  <input type="range" min="5" max="40" value={gridLiftAmount} onChange={e => setGridLiftAmount(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Active Warp Radius: {gridActiveRadius}px</label>
                  <input type="range" min="100" max="400" value={gridActiveRadius} onChange={e => setGridActiveRadius(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            CATEGORY 3: 3D CARDS & TEXT
           ========================================================================= */}
        {activeCategory === 'cards-text' && (
          <>
            {/* Panel 7: Parallax Card */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">7. Parallax Card</h2>
                <p className="panel-desc">Card that tilts in 3D, displacing layered parallax children.</p>
                <div style={{ zIndex: 10 }}>
                  <ParallaxCard 
                    maxTilt={parallaxMaxTilt}
                    style={{
                      width: '260px',
                      height: '160px',
                      background: 'linear-gradient(135deg, #1f1f23, #111115)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: '#d90429',
                      filter: 'blur(20px)',
                      opacity: 0.4,
                      transform: 'translate3d(calc(var(--mx) * -30px), calc(var(--my) * -30px), 10px)'
                    }} />
                    <h3 style={{
                      zIndex: 2,
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      color: '#ffffff',
                      textShadow: '0 4px 10px rgba(0,0,0,0.5)',
                      transform: 'translate3d(calc(var(--mx) * 20px), calc(var(--my) * 20px), 30px)'
                    }}>
                      3D PARALLAX
                    </h3>
                  </ParallaxCard>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Parallax Card Tilt: {parallaxMaxTilt}°</label>
                  <input type="range" min="5" max="30" value={parallaxMaxTilt} onChange={e => setParallaxMaxTilt(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 8: Specular Gloss Card */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">8. Specular Gloss</h2>
                <p className="panel-desc">Glossy radial glare follow overlay reflecting pointer coordinates.</p>
                <div style={{ zIndex: 10 }}>
                  <GlossCard 
                    maxTilt={glossMaxTilt}
                    glossOpacity={glossOpacity}
                    style={{
                      width: '260px',
                      height: '160px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      ✨
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', letterSpacing: '2px' }}>
                      GLINT CARD
                    </span>
                  </GlossCard>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Card Tilt: {glossMaxTilt}°</label>
                  <input type="range" min="5" max="30" value={glossMaxTilt} onChange={e => setGlossMaxTilt(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Specular Glare Opacity: {glossOpacity}</label>
                  <input type="range" min="0.05" max="0.5" step="0.05" value={glossOpacity} onChange={e => setGlossOpacity(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 9: Extruded Text */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">9. Extruded 3D Text</h2>
                <p className="panel-desc">Text block projecting extrusion shadows opposing mouse angle.</p>
                <div style={{ zIndex: 10, marginTop: '2.5rem' }}>
                  <ExtrudedText 
                    text="EXTRUDE" 
                    extrusionLength={extrusionLength}
                    extrusionColor={extrusionColor}
                  />
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Extrusion Shadow Length: {extrusionLength}px</label>
                  <input type="range" min="2" max="20" value={extrusionLength} onChange={e => setExtrusionLength(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Extrusion Color</label>
                  <input type="color" value={extrusionColor} onChange={e => setExtrusionColor(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Panel 10: Depth Button */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">10. Depth Button</h2>
                <p className="panel-desc">Interactive pressable button sinking along Z depth path on click.</p>
                <div style={{ zIndex: 10 }}>
                  <DepthButton 
                    maxTilt={depthButtonMaxTilt} 
                    depth={buttonDepth}
                  >
                    CLICK PRESS
                  </DepthButton>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Tilt Degree: {depthButtonMaxTilt}°</label>
                  <input type="range" min="5" max="25" value={depthButtonMaxTilt} onChange={e => setDepthButtonMaxTilt(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Extrusion Depth: {buttonDepth}px</label>
                  <input type="range" min="2" max="20" value={buttonDepth} onChange={e => setButtonDepth(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 11: Slice Card */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">11. Fractured Slices</h2>
                <p className="panel-desc">Splits children into horizontal slices separating along the Z-axis on hover.</p>
                <div style={{ zIndex: 10 }}>
                  <SliceCard 
                    sliceSpacing={sliceSpacing}
                    style={{ width: '260px', height: '160px' }}
                  >
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #18181b, #27272a)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                      <span style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💠</span>
                      <span style={{ fontWeight: 600, fontSize: '0.9rem', letterSpacing: '1px' }}>SLICED OBJECT</span>
                    </div>
                  </SliceCard>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Slice Separation: {sliceSpacing}px</label>
                  <input type="range" min="5" max="50" value={sliceSpacing} onChange={e => setSliceSpacing(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            CATEGORY 4: ADVANCED 3D REVEALS
           ========================================================================= */}
        {activeCategory === 'reveals' && (
          <>
            {/* Panel 12: Flip Card */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">12. 3D Flip Card</h2>
                <p className="panel-desc">Rotates 180° along the configured axis on hover or click.</p>
                <div style={{ zIndex: 10 }}>
                  <FlipCard 
                    axis={flipAxis}
                    trigger={flipTrigger}
                    width="260px"
                    height="160px"
                    frontContent={
                      <div style={{ width: '100%', height: '100%', background: '#1f1f23', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 600 }}>
                        FRONT FACE
                      </div>
                    }
                    backContent={
                      <div style={{ width: '100%', height: '100%', background: '#d90429', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 600 }}>
                        BACK FACE
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="panel-controls">
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                  <div className="control-group" style={{ flex: 1 }}>
                    <label>Flip Axis</label>
                    <select value={flipAxis} onChange={e => setFlipAxis(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--panel-border)', padding: '0.4rem', borderRadius: '8px' }}>
                      <option value="y">Y Axis (Horizontal)</option>
                      <option value="x">X Axis (Vertical)</option>
                    </select>
                  </div>
                  <div className="control-group" style={{ flex: 1 }}>
                    <label>Trigger</label>
                    <select value={flipTrigger} onChange={e => setFlipTrigger(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--panel-border)', padding: '0.4rem', borderRadius: '8px' }}>
                      <option value="hover">Hover</option>
                      <option value="click">Click</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 13: Hinge Reveal */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">13. Hinge Door Swing</h2>
                <p className="panel-desc">Hinge panel cover folding open 3D-wise to reveal contents.</p>
                <div style={{ zIndex: 10 }}>
                  <HingeReveal 
                    hingeSide={hingeSide}
                    revealAngle={hingeAngle}
                    width="260px"
                    height="160px"
                    coverContent={
                      <div style={{ width: '100%', height: '100%', background: '#1f1f23', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontWeight: 600 }}>
                        🚪 SWING COVER
                      </div>
                    }
                    revealContent={
                      <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.02)', border: '1px dotted rgba(255,255,255,0.2)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', fontSize: '0.9rem' }}>
                        REVEALED CONTENT
                      </div>
                    }
                  />
                </div>
              </div>
              <div className="panel-controls">
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%' }}>
                  <div className="control-group" style={{ flex: 1 }}>
                    <label>Hinge Position</label>
                    <select value={hingeSide} onChange={e => setHingeSide(e.target.value)} style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--panel-border)', padding: '0.4rem', borderRadius: '8px' }}>
                      <option value="left">Left Side</option>
                      <option value="right">Right Side</option>
                      <option value="top">Top Hinge</option>
                      <option value="bottom">Bottom Hinge</option>
                    </select>
                  </div>
                  <div className="control-group" style={{ flex: 1 }}>
                    <label>Swing Angle: {hingeAngle}°</label>
                    <input type="range" min="45" max="180" value={hingeAngle} onChange={e => setHingeAngle(Number(e.target.value))} />
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 14: Layer Scatter */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">14. Exploding Layers</h2>
                <p className="panel-desc">Exploding depth container spreading child nodes along the Z axis.</p>
                <div style={{ zIndex: 10 }}>
                  <LayerScatter 
                    scatterDepth={scatterDepth}
                    style={{
                      width: '260px',
                      height: '160px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <div style={{ background: '#111115', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '16px', display: 'flex', alignItems: 'flex-start', padding: '1rem', color: '#52525b', fontSize: '0.8rem', fontWeight: 600 }}>
                      LAYER 1 (BASE)
                    </div>
                    <div style={{ background: 'rgba(217, 4, 41, 0.1)', border: '1px dashed #d90429', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d90429', fontSize: '0.85rem', fontWeight: 700 }}>
                      LAYER 2 (MID)
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: '1rem', color: '#ffffff', fontSize: '0.9rem', fontWeight: 700, backdropFilter: 'blur(5px)' }}>
                      LAYER 3 (TOP)
                    </div>
                  </LayerScatter>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Z Scatter Separation: {scatterDepth}px</label>
                  <input type="range" min="10" max="80" value={scatterDepth} onChange={e => setScatterDepth(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 15: Spotlight Border */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">15. Spotlight Border</h2>
                <p className="panel-desc">Glowing radial-gradient border spotlight path tracing pointer position.</p>
                <div style={{ zIndex: 10 }}>
                  <SpotlightBorder 
                    maxTilt={spotlightMaxTilt}
                    spotlightColor={spotlightColor}
                    style={{
                      width: '260px',
                      height: '160px'
                    }}
                  >
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                      <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💡</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#71717a', letterSpacing: '1px' }}>
                        SPOTLIGHT BORDER
                      </span>
                    </div>
                  </SpotlightBorder>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Border Tilt: {spotlightMaxTilt}°</label>
                  <input type="range" min="5" max="25" value={spotlightMaxTilt} onChange={e => setSpotlightMaxTilt(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Spotlight Glow Color</label>
                  <input type="color" value={spotlightColor} onChange={e => setSpotlightColor(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Panel 16: Orbit Spring Tilt */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">16. Orbit Spring Tilt</h2>
                <p className="panel-desc">Soft floating loop halts to orient towards active pointer coordinates.</p>
                <div style={{ zIndex: 10 }}>
                  <OrbitSpring 
                    maxTilt={orbitMaxTilt}
                    activeRadius={orbitRadius}
                  >
                    <div style={{
                      width: '120px',
                      height: '120px',
                      background: 'radial-gradient(circle, #27272a 0%, #09090b 100%)',
                      border: '2px solid rgba(255,255,255,0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.8rem',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                    }}>
                      🪐
                    </div>
                  </OrbitSpring>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Homing Tilt: {orbitMaxTilt}°</label>
                  <input type="range" min="5" max="40" value={orbitMaxTilt} onChange={e => setOrbitMaxTilt(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Active Influence Radius: {orbitRadius}px</label>
                  <input type="range" min="100" max="400" value={orbitRadius} onChange={e => setOrbitRadius(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            CATEGORY 5: 3D LAYOUTS & STACKS
           ========================================================================= */}
        {activeCategory === 'layouts' && (
          <>
            {/* Panel 17: Isometric Elevator */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 className="panel-title">17. Isometric Elevator</h2>
                <p className="panel-desc">Grid board tilted isometrically; cells slide upwards on hover.</p>
                <div style={{ zIndex: 10, width: '100%', marginTop: '3.5rem' }}>
                  <IsometricElevator columns="repeat(3, 1fr)" gap="0.75rem">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <IsometricElevatorItem key={i} liftAmount={isometricLift}>
                        <div style={{
                          background: 'rgba(217,4,41,0.1)',
                          border: '1px solid #d90429',
                          borderRadius: '8px',
                          aspectRatio: '1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          color: '#ffffff'
                        }}>
                          {i + 1}
                        </div>
                      </IsometricElevatorItem>
                    ))}
                  </IsometricElevator>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Lift Distance: {isometricLift}px</label>
                  <input type="range" min="10" max="60" value={isometricLift} onChange={e => setIsometricLift(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 18: Depth Tunnel */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">18. Concentric Depth Tunnel</h2>
                <p className="panel-desc">Concentric rings sliding at varying offsets to simulate deep parallax tunnel.</p>
                <div style={{ zIndex: 10, width: '100%', height: '180px', marginTop: '2rem' }}>
                  <DepthTunnel 
                    maxOffset={tunnelOffset}
                    layersCount={tunnelLayers}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <div style={{ color: '#d90429', fontWeight: 'bold', fontSize: '1.2rem' }}>
                      CENTER
                    </div>
                  </DepthTunnel>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Max Offset: {tunnelOffset}px</label>
                  <input type="range" min="5" max="60" value={tunnelOffset} onChange={e => setTunnelOffset(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Tunnel Layers: {tunnelLayers}</label>
                  <input type="range" min="3" max="8" value={tunnelLayers} onChange={e => setTunnelLayers(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 19: Tilted Board */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h2 className="panel-title">19. Tilted Grid Board</h2>
                <p className="panel-desc">tilted grid plane which warps and elevates cells on hover.</p>
                <div style={{ zIndex: 10, width: '100%', marginTop: '3.5rem' }}>
                  <TiltBoard boardRotationX={boardRotX} maxTilt={boardTilt} columns="repeat(3, 1fr)" gap="0.75rem">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <TiltBoardItem key={i} liftAmount={boardLift}>
                        <div style={{
                          padding: '1.2rem 0.5rem',
                          textAlign: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: '#ffffff'
                        }}>
                          CELL {i + 1}
                        </div>
                      </TiltBoardItem>
                    ))}
                  </TiltBoard>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Board Rotation Pitch: {boardRotX}°</label>
                  <input type="range" min="10" max="40" value={boardRotX} onChange={e => setBoardRotX(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Board Follow Tilt: {boardTilt}°</label>
                  <input type="range" min="5" max="25" value={boardTilt} onChange={e => setBoardTilt(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Cell Lift: {boardLift}px</label>
                  <input type="range" min="5" max="50" value={boardLift} onChange={e => setBoardLift(Number(e.target.value))} />
                </div>
              </div>
            </div>

            {/* Panel 20: Card Stack */}
            <div className="panel-card">
              <div className="panel" style={{ padding: '2rem' }}>
                <h2 className="panel-title">20. 3D Card Stack Fan</h2>
                <p className="panel-desc">A stacked deck of overlapping cards that fans out on hover.</p>
                <div style={{ zIndex: 10, width: '100%', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1rem' }}>
                  <CardStack 
                    fanSpacing={stackFan}
                    liftSpacing={stackLift}
                    depthSpacing={stackDepth}
                    style={{ width: '160px', height: '110px' }}
                  >
                    <div style={{ background: '#111115', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#52525b', fontSize: '0.8rem', fontWeight: 600 }}>
                      CARD A
                    </div>
                    <div style={{ background: '#27272a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a1a1aa', fontSize: '0.8rem', fontWeight: 600 }}>
                      CARD B
                    </div>
                    <div style={{ background: '#d90429', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: '0.8rem', fontWeight: 600 }}>
                      CARD C
                    </div>
                  </CardStack>
                </div>
              </div>
              <div className="panel-controls">
                <div className="control-group">
                  <label>Fan Out Spacing: {stackFan}px</label>
                  <input type="range" min="20" max="80" value={stackFan} onChange={e => setStackFan(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Fan Arc Lift: {stackLift}px</label>
                  <input type="range" min="5" max="40" value={stackLift} onChange={e => setStackLift(Number(e.target.value))} />
                </div>
                <div className="control-group">
                  <label>Z Separation Spacing: {stackDepth}px</label>
                  <input type="range" min="5" max="55" value={stackDepth} onChange={e => setStackDepth(Number(e.target.value))} />
                </div>
              </div>
            </div>
          </>
        )}

      </main>
    </>
  )
}

export default App
