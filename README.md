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
- **Reduced-motion aware interactions**: Shared tilt and magnetic hooks now stay at rest when the OS requests less motion.

---

## Installation

```bash
npm install lite-cursor-effects
```

---

## Documentation

We have split the documentation to keep this README clean. Please check out the following guides:

- 📖 **[How to Use & API Reference](HOW_TO_USE.md)** - Detailed quick start examples and full API props tables.
- 🤝 **[Contributing Guidelines](CONTRIBUTING.md)** - Learn how to run the project locally and submit Pull Requests.

---

## License
MIT License. Feel free to use this library in personal or commercial projects.
