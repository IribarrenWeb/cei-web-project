window.addEventListener('load', async () => {

    // Obtener dataset
    const data = await fetch('../src/dataset.json');
    console.log('dataset',data);

    // Parsear a json para recorrerla
    const json = await data.json();
    console.log('json',json);

    // Setear variables correspondientes
    const experiences = json?.experiences ?? [];
    const skills = json?.skills ?? [];

    const experienceList = document.getElementById('experience-list');
    const skillsList = document.getElementById('skills-list');
    let templateExperiences = '';

    // Crear template para modulo experiencia
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

    // Crear template para modulo skills
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