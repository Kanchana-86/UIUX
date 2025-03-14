//Register Plugin
gsap.registerPlugin(ScrollTrigger);

//------------------------------
//Fade In (section 1) - Animates on scroll down, reverse on scroll up ("play reverse play reverse")
gsap.from("#section1 .box", {
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        trigger:"#section1 .box",
        start: "top center", //when the top of the trigger element reaches the center of the viewport.
        markers: true,
        toggleActions: "play reverse play reverse"
    }
});

//------------------------------
//Scale Up (section 2) - Plays on scroll down, resets when leavig from the top ("play none none reset").
gsap.from("#section2 .box", {
    scale: 0,
    duration: 1,
    scrollTrigger: {
        trigger: "#section2 .box",
        start: "top 75%", //when the top of the element reaches 75% down in the viewport.
        markers: true,
        toggleActions: "play none none reset"
    }
});

//------------------------------
//Rotate (section 3) - Restarts animation each time it's re-entered ("restart none none reverse").
gsap.from("#section3 .box", {
    rotation: 360,
    duration: 1,
    scrollTrigger: {
        trigger: "#section3 .box",
        start: "top bottom", //when the top of the element reaches the bottom of the viewport.
        markers: true,
        toggleActions: "restart none none reverse"
    }
});

//-----------------------------
//Slide Right (section 4) - plays when entering, pausing if scrolling stops, resumes on re-entry, resets when exiting ("play pause resume reset").
gsap.from("#section4 .box", {
    x: -200,
    duration: 1,
    scrollTrigger: {
        trigger: "#section4 .box",
        start: "center center",
        markers: true,
        toggleActions: "play pause resume  reset"
    }
});

//------------------------------
//Section 6 - Move Up and Fade In
gsap.from("#section6 .box", {
    opacity: 0,
    y: 100,
    duration: 1.2,
    scrollTrigger: {
        trigger: "#section6 .box",
        start: "top 80%",
        end: "top 40%",
        markers: true,
        toggleActions: "play reverse play reverse"
    }
});

//------------------------------
//Section 7 - Scale Down and Rotate
gsap.from("#section7 .box", {
    scale: 2,
    rotation: 180,
    duration: 1.5,
    scrollTrigger: {
       trigger: "#section7 .box",
       start: "top 80%",
       end: "top 50%",
       markers: true,
       toggleActions: "restart none none reset" 
    }
});

//------------------------------
//section 8 - ZigZag Motion
gsap.from("#section8 .box", {
    x: -100,
    y: 100,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "#section8 .box",
        start: "top bottom",
        end: "top 40%",
        markers: true,
        toggleActions: "play pause resume reset"
    }
});
