fetch('../js/data.json').then((res) => {
  res.json().then(data => {
    console.log(data[2])
  })
})