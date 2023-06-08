module.exports = ({ userName, paymentId, amount, payaidAt }) => {
    const date = new Date(payaidAt);
    const formattedDate = date.toLocaleDateString(); // 5/26/2023 (in the user's local date format)
    const formattedTime = date.toLocaleTimeString(); // 8:35:14 PM (in the user's local time format)
    const today = new Date();
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>payment PDF</title>
    <style>
        header{
            text-align: center;
        }
        .logo img{
            width: 150px;
            height: 150px;
        }
        main{
            text-align: center;
        }
        footer{
            text-align: center;
            margin-top: 20%;
        }

    </style>
</head>
<body>
    <header>
        <div class="logo">
            <img src="http://localhost:5000/public/72d2bbe2-6de8-4332-a077-54489012578e-gym_link.png" >
        </div>
        <div class="date">
            <p>created At: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p> 
        </div>
    </header>
    <main>
        <h1>MR ${userName} has successfully paid his membership</h1>
        <p>Payment ID: ${paymentId}</p>
        <p>Amount: $ ${amount}</p>
        <p>Paid At: ${formattedDate} - ${formattedTime}</p>
    </main>
    <footer>
        <p>All right reserved for GYM LINK 2023&copy;</p>
    </footer>
</body>
</html>
    `;
}