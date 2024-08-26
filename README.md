# Three.js Journey (Celestial Simulation Project)

## Overview

This project simulates the interactions and movements of celestial bodies based on physical laws. Users can add and modify celestial objects with specific properties and observe their behaviors.

## Basic Features
![](./1.png)

- **Gravitational Interaction**: Analyze mutual influences according to the law of universal gravitation.
- **Newtonian Motion**: Study movements using Newton's laws of motion.
- **Custom Celestial Bodies**: Users can add bodies with properties such as:
  - Name
  - Initial position
  - Initial velocity
  - Mass
  - Rotation speed
  - Diameter

## Advanced Features
![](./2.png)

- **Collision Analysis**: Study collisions between celestial bodies.
- **Relativity Effects**: Incorporate effects from relativity theory.
- **Time and Distance Scaling**: Visualize results with time and distance scaling, allowing acceleration and deceleration of time.
- **Property Modification**: Modify and delete properties during execution.
- **Rotational Dynamics**: Study body rotation and changes due to collisions.

- The sphere is geometrically drawn.


## User Interface
![](./3.png)

- **Interactive UI**: An interactive interface for displaying data and events, supporting mouse and keyboard interaction.


## Controls

- Right-click on a planet to reveal information about the planet and the distance between it and another planet
- **W**: Move forward
- **S**: Move backward
- **A**: Move left
- **D**: Move right

- **LEFT**: Rotate left
- **RIGHT**: Rotate right
- **UP**: Rotate up
- **DOWN**: Rotate down

## Technologies Used

- **Three.js**: For rendering 3D graphics.
- **JavaScript**: For implementing simulation logic.
- **CSS**: For styling the interface.


## Setup
Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

``` bash
# Install dependencies (only the first time)
npm install

# Run the local server at localhost:8080
npm run dev

# Build for production in the dist/ directory
npm run build
```

