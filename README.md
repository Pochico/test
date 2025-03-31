# Julen Castillo – React Redesign for WeWantWaste

## Project Overview

This project consists of a UI/UX redesign of the Skip Select Page in the WeWantWaste application.  
The main objective was to improve the visual clarity and flow of the interface while keeping all original functionality intact.

## Approach

The existing design across the platform was already cohesive and legible, so I opted for subtle adjustments rather than a radical overhaul. These changes aim to enhance the user experience without disrupting the visual consistency of the rest of the application.

## Design Decisions

### 1. Card Layout and Visuals

The original skip selection cards allocated a large portion of space—around 40%—to a noisy image that created unnecessary visual clutter. I replaced this with a simplified, more neutral image and removed its padding to make it more integrated and visually balanced.  

Additionally, I removed the size badge that previously overlapped the image, as the same information was already shown in text and did not need to be repeated.

### 2. Content Reorganization

The content inside each card was aligned mainly to one side, leaving empty space and making the cards unnecessarily tall. I reorganized the layout—without changing sizes—so that the content is more evenly distributed. This not only makes better use of space but also brings the cards in line with the visual style used elsewhere in the project, where horizontal rectangular cards are predominant.

### 3. Navigation Buttons

The navigation buttons (Back and Continue) were visually disconnected from the rest of the interface. I chose to center them and unify their design to better match the overall look and feel. Their position was adjusted to remain within the user's field of view without excessive scrolling, streamlining the interaction.

## Notes

All changes were implemented using **vanilla React** with custom components and styles.  
No external UI libraries or frameworks were used.

## Live Preview

You can test the updated version in this sandbox:  
**[Sandbox Link](https://codesandbox.io/p/github/Pochico/wewantwaste-test/main?import=true&workspaceId=ws_6yXByW9ES8ZJgvB8FSofRd)**

## Final Thoughts

After exploring multiple alternatives, this version was selected for offering a more refined and balanced layout. The adjustments are subtle but I believe they contribute significantly to visual harmony and usability, while respecting the original identity of the application.
