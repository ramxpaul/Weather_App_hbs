var form = document.getElementById('myForm');
console.log(form)
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const address = document.getElementById('address').value
    document.getElementById('error').textContent = address
    let fun = async() => {
        try {
            const res = await fetch('http://localhost:3000/weather?address=' + address)
            const data = await res.json()
            if (data.error) {
                console.log('Error Has Occurred')
                document.getElementById('error').textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                document.getElementById('location').textContent = data.location
                document.getElementById('forecast').textContent = data.forecast
            }
            console.log(data)
        } catch (e) { console.log(e) }
    }
    fun()
})