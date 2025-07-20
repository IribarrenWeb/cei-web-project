window.addEventListener('load', async () => {
    const data = await fetch('../src/dataset.json');
    console.log('dataset',data);
    const json = await data.json();
    console.log('json',json);
    const experiences = json?.experiences ?? [];
    const skills = json?.skills ?? [];


    const experienceList = document.getElementById('experience-list');
    const skillsList = document.getElementById('skills-list');
    let templateExperiences = '';
    experiences.forEach(item => {
        templateExperiences +=
        `
            <section class="experience-item">
                <div class="experience-item-period">${item.from} - ${item.to}</div>
                <div>
                    <div class="experience-item-title">${item.title}</div>
                    <div class="experience-item-company">${item.company}</div>
                    <p>${item.description}</p>
                    <div class="experience-item-skills">
                        <ul>
                            ${item.skills.map(skill => `<li>${skill}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </section>
        `
    })

    let templateSkills = '';
    skills.forEach(skill => {
        let templateLevels = ``;
        for (let i = 1; i <= 6; i++) {
            templateLevels += `<span class="skill-level-item ${i <= skill.level ? 'active' : '' }"></span>`;
        } 

        templateSkills +=
        `
            <div class="skill-item">
                <div class="skill-item-name">${skill.name}</div>
                <div class="skill-levels">
                    ${templateLevels}
                </div>
            </div>
        `
    })

    skillsList.innerHTML = templateSkills;

    experienceList.innerHTML = templateExperiences;
});