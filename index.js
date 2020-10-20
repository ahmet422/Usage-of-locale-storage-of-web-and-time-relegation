const addItems = document.querySelector('.add-items');
  const itemsList = document.querySelector('.plates');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  addItems.addEventListener('submit', addItem);

  function addItem(e){
    e.preventDefault();
    // console.log('Hello');
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    }

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items)); // local stoarge can only take strings
    // console.log(item);
    this.reset();
  }

  function populateList(plates = [], platesList){
    platesList.innerHTML = plates.map((plate, i) => {
      return `
      <li>
        <input type='checkbox' data-index=${i} id='item${i}' 
        ${plate.done ? 'checked' : ''}/>
        <label for="item${i}">${plate.text}</label>
      </li>
      `;
    }).join('');
  }

  populateList(items, itemsList);

  function toggleDone(e){
    if(!e.target.matches('input')) return;
    // console.log(e.target);
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items)); // save in a local storage
    populateList(items, itemsList); // to update the actual visibility on checkboxes


  }

  itemsList.addEventListener('click', toggleDone);

  const checkAllbtn = document.querySelector('.checkAllbtn');

  checkAllbtn.addEventListener('click', checkThemAll);

  function checkThemAll(e){
    // console.log(items);
    items.forEach(element => {
      element.done = "true"
    });
    // console.log(items);
    populateList(items, itemsList); 
  }

  // const unCheckAllbtn = document.querySelector('.unCheckAllbtn');
  // unCheckAllbtn.addEventListener('click', unCheckThemAll);

  // function unCheckThemAll(){
  //   items.forEach(element => {
  //     element.done = "false"
  //   });
  //   populateList(items, itemsList); 
  // }