const notesFn = () => {
  //get add button
  const addButton = document.querySelector("#add--button");

  const container = document.querySelector(".container");

  const sect = document.querySelector(".notes--name");

  const form = sect.querySelector("form");

  const optionSect = document.querySelector(".options--section");

  const addNotesFn = (e) => {
    sect.classList.remove("hide");

    //get add file name section
    const submitFn = (e) => {
      const index = () => {
        return Math.random().toString(36).substr(2, 9);
      };

      const input = form.querySelector("input");

      const val = input.value;

      const props = {
        id: index(),
        fileName: val.trim(),
      };
      const { id, fileName } = props;

      const setFilename = (fileName) => {
        let file = "";

        if (fileName == "") {
          file = "untitled";
        } else {
          file = fileName;
        }
        return file;
      };
      const changeQS = (id, name) => {
        const loc = `${location.href}notes/${setFilename(name)}/${id}`;

        let urlParams = new URL(loc);

        const action = form.setAttribute("action", urlParams.href);

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(props),
        };

        localStorage.setItem("props", JSON.stringify(props));

        fetch(urlParams.href, options)
          .then((res) => res)
          .then((data) => data)
          .catch((err) => err);
      };
      changeQS(id, fileName);
    };

    form.addEventListener("submit", submitFn);
  };
  const fetchNotes = () => {
    if (localStorage.getItem("content") === null) {
      return;
    } else {
      const notesData = JSON.parse(localStorage.getItem("content"));

      const arr = [...notesData];

      container.innerHTML = notesData
        .map((notes) => {
          return `<section class="notes--section">
               <textarea name="text--area" id="${notes.id}" readonly >
                   ${notes.content}
                </textarea>
                  <section class="notes--overlay">
                    <h2>${notes.title}</h2>
                </section>
                 <form method="post" class='inner--form' id='hiddenForm' style="visibility: hidden;">
               <input type="hidden" id="custId" name='hidden-form'  readonly="readonly" value="${notes.id}">
                 </form>

            </section>`;
        })
        .join("");
    }
  };
  const showNav = (e) => {
    const ul = optionSect.querySelector("ul");

    ul.classList.toggle("hide");
  };
  fetchNotes();
  //events--area

  addButton.addEventListener("click", addNotesFn);

  optionSect.addEventListener("click", showNav);
};
window.addEventListener("DOMContentLoaded", notesFn);
