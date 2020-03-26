const buttonClick = document.getElementById('load')
const paraGraph = document.querySelector('.errorText')

$(document).ready(() => {
    $('.table-hover').hide()
    $('.errorRow').hide()

})

const showData = (rowID) => {
    $('.row' + rowID).slideToggle()
}

buttonClick.addEventListener('click', (e) => {
    e.preventDefault()
    $('body').loading({
        stoppable: false
    });
    fetch('http://localhost:3000/api/loadblock').then((response) => {
        response.json().then((data) => {
            if (data.errorMessage) {
                $('body').loading('stop');
                paraGraph.textContent = data.errorMessage;
                $('.errorRow').show()
            } else {

                let blockBody = ''
                let row = 0
                data.data.forEach(element => {

                    blockBody += `<tr class="accordion ${row % 2 === 0 ? 'odd' : 'even'}" onclick="showData(${row})">
                    <td>${element.block_num}</td>
                    <td>${element.timestamp}</td>
                    <td>${element.actionCount}</td>
                    </tr>         
                    <pre class="row${row}" style="display: none;">${JSON.stringify(element)}</pre>
                `
                    row++
                })

                document.getElementById('block').innerHTML = blockBody
                $('.table-hover').show()
                $('body').loading('stop');
            }
        })
    })

})