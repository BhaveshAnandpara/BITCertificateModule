import axios from 'axios'


const proxy = 'http://localhost:8001/'


const POST_METHOD = (path, data ) => {

  return new Promise((resolve, reject) => {

    var config = {
      method: 'post',
      url: proxy + path,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };


    axios(config)
      .then(function (response) {
        resolve( response.data )
      })
      .catch(function (error) {
        reject(error)
      });

  })


}

export default POST_METHOD;