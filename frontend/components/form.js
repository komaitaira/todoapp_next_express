if (process.browser) {
  // windowやdocumentを使う処理を記述
  const fetchForm = document.querySelector('.fetchForm');
  const btn = document.querySelector('.btn');
  const url = 'http://localhost:9999/api/todos/create';

  const postFetch = () => {
    const title = document.querySelector('.title').value;
    const formdata = new FormData(fetchForm);
    fetch(url, {
      method: 'POST',
      body: formdata
    }).then((response) => {
        if(!response.ok) {
            console.log('error!');
        } 
        console.log('ok!');
        return response.json();
    }).then((data)  => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
  };

  btn.addEventListener('click', postFetch, false);
}

export default function Form() {
  return (
    <form className="fetchForm" name="fetchForm">
      <input type="text" name="title" className="title" />
      <input type="button" value="送信" className="btn" />      
    </form>
  )
}

