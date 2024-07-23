const skipItem = document.querySelector(".skipItem");
const addItem = document.querySelectorAll(".addItem");
const servicesTab = document.querySelector(".products");
const note = document.querySelector(".note");
const displaytotal = document.querySelector(".total");
const tbody = document.querySelector(".tbody");
const btn = document.querySelector(".button");
const order = document.querySelector(".orderStatus");
const cart = document.querySelector(".cartItem");


const services = [
    {
        service: "Ironing",
        price: 700,
    },
    {
        service: "Dry Cleaning",
        price: 300,
    },
    {
        service: "Stain Removal",
        price: 800,
    },
    {
        service: "Wash and Fold",
        price: 600,
    },
    {
        service: "Leather Cleaning",
        price: 500,
    },
    {
        service: "Wedding Dress Cleaning",
        price: 400,
    }
];

let currentIndex = 0;
let serial = 1;
let total = 0;
function handleAddItem(n) {



    const tableRow = document.querySelectorAll(`.${"index" + n}`)
    
    const clickedButton = document.querySelectorAll(".addItem")[n];
   
    if (clickedButton.classList.contains("skipItem")) {
        clickedButton.classList.remove("skipItem")
        clickedButton.innerHTML = "Add Item"
        
        tableRow.forEach(row => {
            // row.style.display = "none"
            row.remove()
        })
        
        total = total - services[n].price
        serial--
        updateTotalDisplay()
        updateSerialNumbers()
        if (serial == 1) {
            btn.style.opacity = ".4";
            
        }

    }
    else {
        clickedButton.classList.add("skipItem");
        clickedButton.innerHTML = "Remove Item"

        if (serial === 1) {
            // tbody.innerHTML = "";
            note.remove()
        }
        note.classList.add("d-none");
        cart.style = "height: 170px;"
        
        tbody.innerHTML = tbody.innerHTML + renderTableRow(services[n], n)
        serial++;
      
        total += services[n].price;
        updateTotalDisplay();
        btn.style.opacity = "1";
        

       
    }
}



services.forEach((currValue, index) => {

    servicesTab.innerHTML = servicesTab.innerHTML + `<div class="d-flex justify-content-between align-items-center w-100 my-2">
    <div class="d-flex w-100">
        <p>${currValue.service}</p>
        <li class="price blue">${currValue.price}</li>
    </div>
    <button class="p-2 addItem ms-4" onclick="handleAddItem(${index})">Add item</button>
</div>`

})



function renderTableRow(service, index) {
    return `
        <tr style="height: 25px;" class="index${index}">
            <td>${serial}</td>
            <td>${service.service}</td>
            <td class="price">${service.price}</td>
        </tr>
    `;
}

function updateTotalDisplay() {
    displaytotal.textContent = total;
}

function updateSerialNumbers() {
    const trs = tbody.querySelectorAll('tr'); 
    trs.forEach((tr, index) => {
        const serialCell = tr.querySelector('td:first-child'); 
        if (serialCell) {
            serialCell.textContent = index + 1; 

        }
    });
}





btn.addEventListener("click", () => {
    const username = document.querySelector('.name').value
    const userEmail = document.querySelector('.email').value
    const phone = document.querySelector('.phone').value
    const regex = /\S+@\S+\.\S+/;
    if (serial === 1) {
        order.textContent = "Please add items to the cart to book.";
        order.style.color = "red";
    } 
    else if(username == '' || userEmail == '' || phone == '' || !regex.test(userEmail)){
        order.textContent = "Plz Fill out all fields"
        order.style.color = "red";
    }
    else {
        sendMail()
        order.textContent = "Thank you for contacting, we will get back to you soon.";
        order.style.color = "green";
        
    }

    
});



// emailjs implementation------------------------------------------------------------------------------------------------------------------




emailjs.init("iobupkKMUtjLWEAbY");



// Function to send order booking details via email
function sendMail(orderDetails) {
    const username = document.querySelector('.name').value
    const userEmail = document.querySelector('.email').value
    const phone = document.querySelector('.phone').value
    const table = document.querySelector('.table')
    const tableData = table.innerHTML
    
    const templateParams = {
        to_email: userEmail,
        from_name: "Laundry Cart",
        to_name: username,
        order_details: tableData,
        message: "Below are the details"
    };
    console.log(userEmail);



    emailjs.send("service_7y89lt8","template_4sazd0r", templateParams)
        .then(function(response) {
            console.log("Email sent successfully", response);
        }, function(error) {
            console.error("Email sending failed", error);
        });
}



