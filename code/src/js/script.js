{
  const list = document.querySelector(`.items`);
  const hp = document.querySelector(`.homepage`);
  const dp = document.querySelector(`.detailpage`);
  const init = () => {
    fetchData();
  };

  const fetchData = () => {
    fetch(`./data/data.json`)
      .then(d => d.json())
      .then(d => generateList(d));
  };

  const generateList = projects => {
    console.log(projects);
    projects.forEach(project => {
      console.log(project);
      const li = document.createElement(`li`);
      li.classList.add(`item`);
      li.innerHTML = `
        <div>
          <h1 class="item-title">${project.name}
          <p class="item-tags">${project.tags}</p></h1>
          <img class="item-img" src="${project.pic_url}" alt="${project.name}" />
        </div>
      `;
      list.appendChild(li);
      li.addEventListener(`click`, () => clickOnProject(project));
    });
  };

  const clickOnProject = project => {
    if (!hp.classList.contains(`hide`)) {
      hp.classList.add(`hide`);
      dp.classList.remove(`hide`);
      displayContent(project);
    }
    console.log(project);
  };

  const displayContent = project => {
    dp.innerHTML = `
    <a class="back-button" href="index.html"> &larr; All work</a>
    <section class="dp-top">
    <div class="dp-top-first">
      <div>
        <h1 class="hide">${project.name}</h1>
        <h2 class="dp-name">${project.name}</h2>
        <p class="dp-date">${project.date}</p>
      </div>
      <a class="dp-url" target="_blank" href="${project.url}">Check it out</a>
      </div>
      <div class="dp-top-second">
      <p class="dp-short-desc">${project.short_desc}</p>
      <p class="dp-tags">${project.tags}</p> 
      </div>
    </section>
    <img class="dp-image" src="${project.pic_url}" />
    <section class="dp-main">
      <article class="dp-article"></article>
      
    </section>
    
    `;
    if (project.video) {
      const video = document.createElement(`section`);
      video.innerHTML = `<h1 class="dp-title">Video</h1>
    <video controls class="dp-video">
      <source src="${project.video}"
            type="video/mp4">
    </video>`;
      dp.appendChild(video);
    }
    const article = document.querySelector(`.dp-article`);
    article.innerHTML = project.long_desc;
    if (project.visuals) {
      const main = document.querySelector(`.dp-main`);
      const section = document.createElement(`section`);
      section.classList.add(`dp-visuals`);
      section.innerHTML = `
      <h1 class="dp-title">Visuals</h1>
      <ul class="dp-visuals-list"></ul>
      `;
      main.appendChild(section);
      const list = document.querySelector(`.dp-visuals-list`);
      project.visuals.forEach(img => {
        const li = document.createElement(`li`);
        const pic = document.createElement(`img`);
        pic.setAttribute(`src`, img);
        li.appendChild(pic);
        list.appendChild(li);
      });
    }
    const btn = document.querySelector(`.dp-url`);
    btn.style.background = project.color;
  };

  init();
}
