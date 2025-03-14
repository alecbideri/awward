# All components used

## Hero Component

The `Hero` component is a visually engaging full-screen section designed for a gaming website. It features a background video that transitions between multiple videos, a mini video preview that scales on hover, and a trapezoid-shaped clip-path animation triggered by scrolling. The component also includes a loading overlay that disappears once all videos are loaded, ensuring a smooth user experience.

## Features
- **Dynamic Video Background**: Displays a looping background video that can transition between three different videos (`hero-1.mp4`, `hero-2.mp4`, `hero-3.mp4`) when the user clicks a mini video preview.
- **Mini Video Preview**: A centrally positioned mini video that scales and fades in on hover, showing the next video in the sequence. Clicking it triggers a transition to that video.
- **Scroll-Triggered Trapezoid Animation**: The entire section starts as a full rectangle and transforms into a trapezoid shape with rounded bottom corners as the user scrolls down, creating a dynamic visual effect.
- **Loading Overlay**: A full-screen loading animation (three-dot loader) covers the page until all videos are loaded, ensuring content is ready before display.
- **Interactive Elements**: Includes a stylized heading ("REDEFINE"), a tagline, and a "Watch Trailer" button with an icon.

## Dependencies
- **React**: For state management and rendering.
- **GSAP**: For animations, including the video transition and scroll-triggered clip-path transformation.
- **GSAP ScrollTrigger**: For tying the trapezoid animation to scroll position.
- **React Icons**: For the arrow icon in the "Watch Trailer" button.

## State Management
- **`currentIndex` (number, default: 1)**:
    - Tracks the currently displayed background video (1, 2, or 3, corresponding to `hero-1.mp4`, `hero-2.mp4`, `hero-3.mp4`).
    - Updated when the user clicks the mini video to cycle to the next video.
- **`hasClicked` (boolean, default: false)**:
    - Indicates whether the mini video has been clicked to trigger the GSAP animation for transitioning to the next video.
- **`isLoading` (boolean, default: true)**:
    - Controls the visibility of the loading overlay. Starts as `true` and switches to `false` when all videos are loaded.
- **`loadedVideos` (number, default: 0)**:
    - Counts how many videos have finished loading. Increments with each video’s `onLoadedData` event and triggers `isLoading` to `false` when all videos are loaded.

## Functions
- **`handleVideoLoaded`**:
    - Increments `loadedVideos` each time a video’s `onLoadedData` event fires, indicating the video has loaded.
    - Used by all three video elements (`mini-video`, `#next-video`, and background video).
- **`upcomingVideoIndex`**:
    - Calculates the index of the next video in the sequence (e.g., if `currentIndex` is 1, the next is 2; if 3, loops back to 1).
    - Used to set the source of the mini video and the transitioning video (`#next-video`).
- **`handleMiniVdClick`**:
    - Handles clicks on the mini video preview.
    - Sets `hasClicked` to `true` to trigger the GSAP transition animation and updates `currentIndex` to the next video.
- **`getVideoSrc`**:
    - Returns the file path for a video based on its index (e.g., `videos/hero-1.mp4` for index 1).
    - Used to dynamically set the `src` attribute for all video elements.

## GSAP Animations
The component uses two `useGSAP` hooks for animations:

### 1. Video Transition Animation
- **Trigger**: Runs when `hasClicked` is `true` (i.e., when the mini video is clicked).
- **Dependencies**: `[currentIndex]`—re-runs whenever `currentIndex` changes.
- **Behavior**:
    - Makes `#next-video` (the transitioning video) visible.
    - Animates `#next-video` from a small scale (default state) to full-screen (`scale: 1`, `width: '100%'`, `height: '100%'`) over 1 second with a `power1.inOut` ease.
    - Plays the video during the animation via `onStart`.
- **Intention**: Creates a smooth transition effect where the mini video preview expands to replace the current background video, giving the illusion of seamless video switching.

### 2. Scroll-Triggered Trapezoid Animation
- **Trigger**: Runs once on component mount (no dependencies).
- **Initial Setup**:
    - Sets `#video-frame` to a full rectangle (`clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'`) with no border radius.
- **Animation**:
    - Animates `#video-frame` to a trapezoid shape (`clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)'`) with `borderRadius: '0 0 40% 10%'`.
    - Uses `ScrollTrigger` to tie the animation to scroll position:
        - `start: 'top top'`: Begins when the top of `#video-frame` reaches the top of the viewport.
        - `end: 'bottom top'`: Ends when the bottom of `#video-frame` reaches the top of the viewport.
        - `scrub: true`: Animation progress is directly tied to scroll position, creating a smooth transformation.
- **Intention**: Provides a dynamic visual effect where the hero section starts as a full-screen rectangle and gradually forms a trapezoid with rounded bottom corners as the user scrolls down, enhancing the page’s interactivity.

## Loading Overlay
- **Behavior**: Displays a full-screen violet overlay (`bg-violet-50`) with a three-dot loading animation when `isLoading` is `true`.
- **Trigger**: Disappears when `loadedVideos` reaches 3 (i.e., all videos are loaded), as managed by the `useEffect` hook.
- **Intention**: Ensures users don’t see incomplete content by waiting for all videos to load before revealing the hero section.

## Usage
To use the `Hero` component, simply import and include it in your React application. Ensure the video files (`hero-1.mp4`, `hero-2.mp4`, `hero-3.mp4`) are in the `videos/` directory relative to your public folder. The component assumes Tailwind CSS is set up for styling (e.g., `h-dvh`, `w-screen`, `bg-Zblue-75`, etc.).

```jsx
import Hero from './components/Hero';

function App() {
  return (
    <div>
      <Hero />
      {/* Add more sections below for scrolling */}
    </div>
  );
}
```

# Button Component

The `Button` component is a reusable, customizable button designed for React applications. It features a modern design with a violet background, rounded shape, and support for icons and dynamic styling, making it suitable for various UI interactions.

## Features
- **Customizable Styling**: Accepts a `containerClass` prop to apply additional Tailwind CSS classes for tailored design.
- **Icon Support**: Allows placement of left and right icons using `leftIcon` and `rightIcon` props.
- **Dynamic Text**: Displays a title passed via the `title` prop with uppercase styling and an overflow-hidden effect.
- **Accessibility**: Includes an `id` prop fo3r unique identification.

## Props
- **`title` (string)**: The text displayed on the button (e.g., "Watch Trailer").
- **`id` (string)**: Unique identifier for the button.
- **`containerClass` (string)**: Additional Tailwind CSS classes to customize the button's appearance (e.g., `!bg-Zyellow-300`).
- **`leftIcon` (ReactNode)**: Icon component to display on the left side of the text (e.g., `<TiLocationArrow />`).
- **`rightIcon` (ReactNode)**: Icon component to display on the right side of the text (optional).

## Usage
To use the `Button` component, import it and pass the required props. Ensure Tailwind CSS is configured for styling.

```jsx
import Button from './components/Button';
import { TiLocationArrow } from 'react-icons/ti';

function App() {
  return (
    <Button
      id="watch-trailer"
      title="watch trailer"
      leftIcon={<TiLocationArrow />}
      containerClass="!bg-Zyellow-300 flex-center gap-1"
    />
  );
}