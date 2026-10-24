/* 1. Select invoice item elements */

const quantityInputs = document.querySelectorAll(".quantity");
const rateInputs = document.querySelectorAll(".rate");
const amountCells = document.querySelectorAll(".amount");


/* 2. Select subtotal and grand total */

const subtotalElement = document.getElementById("subtotal");
const grandTotalElement = document.getElementById("grand-total");

/* 3. Select GST amount elements */

const cgstElement = document.getElementById("cgst");
const sgstElement = document.getElementById("sgst");
const igstElement = document.getElementById("igst");

// GST percentage labels
const cgstLabel = document.getElementById("cgstLabel");
const sgstLabel = document.getElementById("sgstLabel");
const igstLabel = document.getElementById("igstLabel");
/* 4. Select GST rows */

const cgstRow = document.getElementById("cgstRow");
const sgstRow = document.getElementById("sgstRow");
const igstRow = document.getElementById("igstRow");


/* 5. Select GST dropdowns */

const taxStateSelect = document.getElementById("taxState");
const gstRateSelect = document.getElementById("gstRate");


/* 6. Select print button */

const printButton = document.getElementById("print-button");


/* 7. Format amount in Indian Rupees */

function formatCurrency(amount) {
    return amount.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}


/* 8. Calculate invoice */

function calculateInvoice() {

    let subtotal = 0;

    // Calculate each item amount
    quantityInputs.forEach((quantityInput, index) => {

        const quantity = Number(quantityInput.value) || 0;
        const rate = Number(rateInputs[index].value) || 0;

        const amount = quantity * rate;

        amountCells[index].textContent = formatCurrency(amount);

        subtotal += amount;
    });


    // Display subtotal
    subtotalElement.textContent = formatCurrency(subtotal);


    // Read selected GST rate
    const gstRate = Number(gstRateSelect.value) / 100;

    // Update CGST and SGST percentage labels
const halfGstRate = Number(gstRateSelect.value) / 2;

cgstLabel.textContent = `CGST (${halfGstRate}%)`;
sgstLabel.textContent = `SGST (${halfGstRate}%)`;
igstLabel.textContent = `IGST (${Number(gstRateSelect.value)}%)`;
    // Calculate GST on subtotal
    const totalGST = subtotal * gstRate;

    let cgst = 0;
    let sgst = 0;
    let igst = 0;


    // Maharashtra: CGST + SGST
    if (taxStateSelect.value === "Maharashtra") {

        cgst = totalGST / 2;
        sgst = totalGST / 2;

        cgstRow.style.display = "";
        sgstRow.style.display = "";
        igstRow.style.display = "none";

    } else {

        // Other State: IGST only
        igst = totalGST;

        cgstRow.style.display = "none";
        sgstRow.style.display = "none";
        igstRow.style.display = "";
    }


    // Display GST amounts
    cgstElement.textContent = formatCurrency(cgst);
    sgstElement.textContent = formatCurrency(sgst);
    igstElement.textContent = formatCurrency(igst);


    // Calculate grand total
    const grandTotal = subtotal + cgst + sgst + igst;

    grandTotalElement.textContent = formatCurrency(grandTotal);
}


/* 9. Update calculations when quantities change */

quantityInputs.forEach(input => {
    input.addEventListener("input", calculateInvoice);
});


/* 10. Update calculations when rates change */

rateInputs.forEach(input => {
    input.addEventListener("input", calculateInvoice);
});


/* 11. Update calculations when dropdowns change */

taxStateSelect.addEventListener("change", calculateInvoice);
gstRateSelect.addEventListener("change", calculateInvoice);


/* 12. Print invoice */

if (printButton) {
    printButton.addEventListener("click", () => {
        window.print();
    });
}


/* 13. Calculate when page loads */

calculateInvoice();