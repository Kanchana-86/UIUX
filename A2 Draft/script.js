function nextScene(sceneNumber, choice = '') {
    document.querySelectorAll('.scene').forEach(scene => scene.classList.remove('active'));
    document.getElementById('scene' + sceneNumber).classList.add('active');

    if (sceneNumber === 5) {  
        let outcomeText = '';
        if (choice === 'report') {
            outcomeText = 'OmniData is investigated, but the case is buried under legal pressure.';
        } else if (choice === 'negotiate') {
            outcomeText = 'OmniData agrees to change policies, but their control remains.';
            setTimeout(() => nextScene(7), 2000); // Auto-move to reset
            return;
        } else {
            outcomeText = 'Alex remains unsure about the next step.';
        }
        document.getElementById('outcome').innerText = outcomeText;
    }

    if (sceneNumber === 6) {
        let contactText = '';
        if (choice === 'contact') {
            contactText = 'They can contact the Government or Private experts.';
        } else if (choice === 'legal') {
            contactText = 'Legal experts are assessing the case.';
        }
        document.getElementById('contactOutcome').innerText = contactText;
    }

    if (sceneNumber === 7) {
        setTimeout(() => location.reload(), 10000); // Auto-reset after 3 sec
    }
}