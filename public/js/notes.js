const notesAreaFn = () => {
  const fontsSection = document.querySelector(".fonts--section");

  const editArea = document.querySelector(".text--area");

  const title = document.querySelector(".title");

  const menuButton = document.querySelector("#menu--button");

  const optionSect = document.querySelector(".options--section");

  document.execCommand("defaultParagraphSeparator", false, "p");
  document.execCommand("defaultParagraphSeparator", false, "br");

  const showMenu = (e) => {
    fontsSection.classList.add("show");
    const closeButton = document.querySelector("#close--button");

    const closeFn = () => {
      fontsSection.classList.remove("show");
    };

    closeButton.addEventListener("click", closeFn);
  };

  const showNav = (e) => {
    const ul = optionSect.querySelector("ul");

    ul.classList.toggle("hide");
  };

  const headings = () => {
    const headingType = fontsSection.querySelector(".headings--section");

    const headingsSelect = headingType.querySelector("select");

    const addHeadings = () => {
      const headingVal = headingsSelect.value;
      switch (headingVal) {
        case "h1":
          if (editArea.innerHTML.trim() === "") {
            editArea.insertAdjacentHTML(
              "afterbegin",
              ` <h1>heading</h1>
        `
            );
          } else {
            editArea.insertAdjacentHTML(
              "beforeend",
              `<h1 >heading</h1>
        `
            );
          }

          break;

        case "h2":
          if (editArea.innerHTML.trim() === "") {
            editArea.insertAdjacentHTML("afterbegin", "<h2 >heading</h2>");
          } else {
            editArea.insertAdjacentHTML("beforeend", "<h2>heading</h2>");
          }

          break;

        case "h3":
          if (editArea.innerHTML.trim() === "") {
            editArea.insertAdjacentHTML("afterbegin", "<h3>heading</h3>");
          } else {
            editArea.insertAdjacentHTML("beforeend", "<h3>heading</h3>");
          }

          break;

        case "h4":
          if (editArea.innerHTML.trim() === "") {
            editArea.insertAdjacentHTML("afterbegin", "<h4>heading</h4>");
          } else {
            editArea.insertAdjacentHTML("beforeend", "<h4>heading</h4>");
          }

          break;

        case "h5":
          if (editArea.innerHTML.trim() === "") {
            editArea.insertAdjacentHTML("afterbegin", "<h5>heading1</h5>");
          } else {
            editArea.insertAdjacentHTML("beforeend", "<h5>heading1</h5>");
          }

          break;

        case "h6":
          if (editArea.innerHTML.trim() === "") {
            editArea.insertAdjacentHTML("afterbegin", "<h6>heading</h6>");
          } else {
            editArea.insertAdjacentHTML("beforeend", "<h6>heading</h6>");
          }

          break;
      }
    };

    headingsSelect.addEventListener("change", addHeadings);
  };
  const fetchData = () => {
    //options to avoid cros error
    const url = location.href;

    const op = {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    //fetch data from backend
    fetch(url, op)
      .then((res) => res.json())
      .then((data) => {
        //copy that array data
        if (data === null || data.length == 0) {
          return;
        }
        const arr = [...data];

        setFonts(arr);
      });
  };

  const setFonts = (arrData) => {
    if (arrData === null || arrData.length == 0) {
      return;
    }
    //get font type

    const fontType = fontsSection.querySelector(".font--type");

    //get select

    const fontSelect = fontType.querySelector("select");

    //set option values

    const fontSelectHTML = arrData
      .map((dta) => {
        return `<option value="${dta.family}" >
   ${dta.family}
   </option>`;
      })
      .join("");

    fontSelect.insertAdjacentHTML("afterbegin", fontSelectHTML);
    //innerHtml ends here
    //fontsFn starts here
    const fontsFn = () => {
      //get both sections
      const fontWsection = document.querySelector(".fontweight");
      //getVariant sect
      const fontSub = document.querySelector(".font--subset");
      //get font weight and  font type
      const fontWeight = document.querySelector("#font--weight");

      const fontSubset = document.querySelector("#font--subset");

      const fontSize = document.querySelector("#font-Size");

      const index = fontSelect.selectedIndex;
      //get selectVal
      const selectVal = fontSelect.value;

      const cateGory = arrData[index].category;

      const variants = arrData[index].variants;

      const subSets = arrData[index].subsets;

      const fontItem = arrData[index].files;

      const fontTypeName = Object.keys(fontItem);

      const fontTypeUrl = Object.values(fontItem);

      editArea.style.fontFamily = `'${selectVal}', ${cateGory}`;

      fontWsection.classList.remove("hide");

      const fontWeightHTML = variants
        .map((variant) => {
          return `<option value="${variant}">
   ${variant}
   </option>`;
        })
        .join("");
      fontWeight.insertAdjacentHTML("beforeend", fontWeightHTML);
      //fw innerHtml ends here

      //set subset values
      fontSub.classList.remove("hide");
      const fontSubsetHTML = subSets
        .map((sub) => {
          return `<option value="${sub}">
   ${sub}
   </option>`;
        })
        .join("");
      fontSubset.insertAdjacentHTML("beforeend", fontSubsetHTML);
      //fs innerHtml ends here
      // now set font face
      const styleElement = document.createElement("style");

      styleElement.appendChild(
        document.createTextNode(
          `@font-face{

   font-family: '${selectVal}', ${cateGory};
   src:url('${fontTypeUrl.map((url) => url)}') format('ttf');
}`
        )
      );
      // //ele ends here
      document.head.appendChild(styleElement);

      const setFontVal = (e) => {
        const target = e.target;

        const targetVal = target.value;

        const check = /\b(\d*\.?\d+) *([a-zA-Z]+)/.test(targetVal);

        const targetId = target.id;

        switch (targetId) {
          case "font--weight":
            if (check) {
              editArea.style.fontWeight = `${targetVal.slice(0, 3)}`;
              editArea.style.fontStyle = "italic";
            } else if (targetVal == "regular") {
              editArea.style.fontWeight = "normal";
              editArea.style.fontStyle = "normal";
            } else if (targetVal == "italic") {
              editArea.style.fontWeight = "normal";
              editArea.style.fontStyle = "italic";
            } else {
              editArea.style.fontWeight = `${targetVal}`;
              editArea.style.fontStyle = "normal";
            }
            break;
          case "font-Size":
            editArea.style.fontSize = ` ${targetVal}pt`;
            break;
        }
      };
      [fontSize, fontWeight, fontSubset].forEach((type) =>
        type.addEventListener("change", setFontVal)
      );
    };
    //set event for select
    fontSelect.addEventListener("change", fontsFn);
  };

  const setColor = () => {
    const colorSect = document.querySelector(".color--section");

    const colorForm = colorSect.querySelector("form");

    const addColor = (e) => {
      e.preventDefault();

      const input = colorForm.querySelector("input").value;

      if (input.trim() == "") {
        return;
      } else {
        editArea.style.color = `${input}`;
      }

      colorForm.reset();
    };

    colorForm.addEventListener("submit", addColor);
  };

  const textAlign = () => {
    const alignGrid = document.querySelector(".grid--section");

    const alignButtons = alignGrid.querySelectorAll("button");

    const addAlign = (e) => {
      const target = e.target.id;

      switch (target) {
        case "justify":
          editArea.style.textAlign = "justify";

          break;
        case "center":
          editArea.style.textAlign = "center";

          break;
        case "right":
          editArea.style.textAlign = "right";

          break;
        case "left":
          editArea.style.textAlign = "left";

          break;

        default:
          editArea.style.textAlign = "left";
          break;
      }
    };
    alignButtons.forEach((button) => {
      button.addEventListener("click", addAlign);
    });
  };

  const notifications = (id) => {
    const notif = document.querySelector(".notifications");

    const small = notif.querySelector("small");

    switch (id) {
      case "save--button":
        notif.classList.remove("hide");
        notif.classList.add("noti");
        small.textContent = "file saved";
        setTimeout(() => {
          notif.classList.add("hide");
        }, 1500);

        break;

      case "delete--button":
        notif.classList.remove("hide");
        notif.classList.add("noti");
        small.textContent = "file deleted";
        setTimeout(() => {
          notif.classList.add("hide");
        }, 1500);

        break;

      case "copy--button":
        notif.classList.remove("hide");
        notif.classList.add("noti");
        small.textContent = "copied to clipboard";
        setTimeout(() => {
          notif.classList.add("hide");
        }, 1500);

        break;
    }
  };
  const asideArea = () => {
    const aside = document.querySelector("aside");

    const asideButtons = aside.querySelectorAll("button");

    const saveFn = (tar) => {
      const notes = {
        content: editArea.textContent.trim(),
        title: title.textContent.trim(),
        url: location.href,
      };

      document.title = notes.title;

      editArea.classList.add("saved");

      if (localStorage.getItem("props") === null) {
        return;
      }

      const contentObj = JSON.parse(localStorage.getItem("props"));

      const { id, fileName } = contentObj;

      const updateObj = { id, ...notes };

      if (localStorage.getItem("content") === null) {
        const contentArr = [];

        contentArr.push(updateObj);

        localStorage.setItem("content", JSON.stringify(contentArr));
      } else {
        const update = JSON.parse(localStorage.getItem("content"));

        const expression = " ^http://example.com/foo(?:/.*)?$";

        update.push(updateObj);

        localStorage.setItem("content", JSON.stringify(update));
      }

      notifications(tar);
    };

    const deleteFn = (tar) => {
      if (
        window.confirm("are you sure you want to delete the content") &&
        !editArea.classList.contains("saved")
      ) {
        editArea.textContent = "";
        notifications(tar);
      } else {
        return;
      }
    };

    const copyFn = (tar) => {
      const selection = window.getSelection();
      if (selection) {
        document.execCommand("selectAll");
        document.execCommand("copy");
        notifications(tar);
      }
    };

    const asideFn = (e) => {
      const target = e.target.id;

      switch (target) {
        case "save--button":
          saveFn(target);

          break;
        case "delete--button":
          deleteFn(target);

          break;
        case "copy--button":
          copyFn(target);

          break;
      }
    };
    asideButtons.forEach((button) => {
      button.addEventListener("click", asideFn);
    });
  };
  fetchData();

  setColor();

  textAlign();

  asideArea();

  headings();

  menuButton.addEventListener("click", showMenu);

  optionSect.addEventListener("click", showNav);
};
window.addEventListener("DOMContentLoaded", notesAreaFn);
