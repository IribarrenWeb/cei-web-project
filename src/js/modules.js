window.addEventListener('load', async () => {
    const data = await fetch('../src/dataset.json');
    console.log('dataset',data);
    const json = await data.json();

    const experienceList = document.getElementById('experience-list');
    let template = '';
    json.forEach(item => {
        template +=
        `
            <section class="experience-item">
                <div class="experience-item-period">${item.to} - ${item.from}</div>
                <div class="experience-item-title">${item.title}</div>
                <p>${item.description}</p>
                <div class="experience-item-skills">
                    <ul>
                        ${item.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
            </section>
        `
    })


    experienceList.innerHTML = template;
});