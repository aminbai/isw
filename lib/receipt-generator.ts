// Enhanced receipt generator with jsPDF for beautiful PDF generation
export function generateReceipt(donationData: any) {
  // For demo purposes, we'll create a beautiful HTML-based receipt that can be printed as PDF
  // In production, you would install jsPDF: npm install jspdf

  const receiptHTML = `
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>দান রসিদ - ${donationData.donationId}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans Bengali', sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .receipt-container {
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            width: 100%;
            max-width: 600px;
            position: relative;
        }
        
        .receipt-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .receipt-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(255,255,255,0.1) 10px,
                rgba(255,255,255,0.1) 20px
            );
            animation: pattern-move 20s linear infinite;
        }
        
        @keyframes pattern-move {
            0% { transform: translateX(-50px) translateY(-50px); }
            100% { transform: translateX(0px) translateY(0px); }
        }
        
        .org-logo {
            width: 80px;
            height: 80px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            position: relative;
            z-index: 2;
        }
        
        .org-name {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 10px;
            position: relative;
            z-index: 2;
        }
        
        .org-subtitle {
            font-size: 16px;
            opacity: 0.9;
            position: relative;
            z-index: 2;
        }
        
        .receipt-body {
            padding: 40px;
        }
        
        .receipt-title {
            text-align: center;
            font-size: 24px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 30px;
            position: relative;
        }
        
        .receipt-title::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #10b981, #059669);
            border-radius: 2px;
        }
        
        .receipt-info {
            display: grid;
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
            border-left: 4px solid #10b981;
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 150px;
        }
        
        .info-value {
            font-weight: 400;
            color: #1f2937;
            text-align: right;
            flex: 1;
        }
        
        .amount-highlight {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white !important;
            font-size: 18px;
            font-weight: 700;
        }
        
        .receipt-footer {
            background: #f8fafc;
            padding: 30px;
            text-align: center;
            border-top: 2px dashed #e5e7eb;
        }
        
        .thank-you {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
        }
        
        .dua {
            font-size: 16px;
            color: #6b7280;
            font-style: italic;
        }
        
        .receipt-id {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255,255,255,0.2);
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
        }
        
        .print-info {
            margin-top: 20px;
            font-size: 12px;
            color: #6b7280;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .receipt-container {
                box-shadow: none;
                border: 1px solid #e5e7eb;
            }
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="receipt-header">
            <div class="receipt-id">রসিদ নং: ${donationData.donationId}</div>
            <div class="org-logo">🕌</div>
            <div class="org-name">ইসলামী সমাজকল্যাণ পরিষদ</div>
            <div class="org-subtitle">গ্রামীণ সমাজের উন্নয়নে নিবেদিত</div>
        </div>
        
        <div class="receipt-body">
            <h2 class="receipt-title">দান রসিদ</h2>
            
            <div class="receipt-info">
                <div class="info-row">
                    <span class="info-label">দানকারীর নাম:</span>
                    <span class="info-value">${donationData.donorName}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">মোবাইল নম্বর:</span>
                    <span class="info-value">${donationData.phone}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">ঠিকানা:</span>
                    <span class="info-value">${donationData.address}</span>
                </div>
                
                <div class="info-row amount-highlight">
                    <span class="info-label">দানের পরিমাণ:</span>
                    <span class="info-value">৳${donationData.amount?.toLocaleString()}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">পেমেন্ট মেথড:</span>
                    <span class="info-value">${donationData.paymentMethod === "bkash" ? "বিকাশ" : donationData.paymentMethod === "nagad" ? "নগদ" : "ব্যাংক ট্রান্সফার"}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">ট্রানজেকশন আইডি:</span>
                    <span class="info-value">${donationData.transactionId}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">তারিখ ও সময়:</span>
                    <span class="info-value">${donationData.date} - ${donationData.time}</span>
                </div>
            </div>
        </div>
        
        <div class="receipt-footer">
            <div class="thank-you">আপনার দানের জন্য আন্তরিক ধন্যবাদ!</div>
            <div class="dua">আল্লাহ তা'আলা আপনাকে উত্তম প্রতিদান দিন</div>
            <div class="print-info">
                যোগাযোগ: +৮৮০ ১৭১২-৩৪৫৬৭৮ | info@islamicwelfare.org<br>
                গ্রাম: আদর্শগ্রাম, উপজেলা: সদর, জেলা: ঢাকা
            </div>
        </div>
    </div>
    
    <script>
        // Auto print when page loads
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 1000);
        }
    </script>
</body>
</html>
  `

  // Create a new window with the receipt
  const printWindow = window.open("", "_blank", "width=800,height=900")
  if (printWindow) {
    printWindow.document.open()
    printWindow.document.write(receiptHTML)
    printWindow.document.close()
  }

  // Also create a downloadable version
  const blob = new Blob([receiptHTML], { type: "text/html" })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `receipt-${donationData.donationId}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  window.URL.revokeObjectURL(url)
}

// Alternative function for generating PDF with jsPDF (when installed)
export async function generatePDFReceipt(donationData: any) {
  try {
    // This would require: npm install jspdf html2canvas
    // const jsPDF = await import('jspdf')
    // const html2canvas = await import('html2canvas')

    console.log("PDF generation would require jsPDF installation")

    // For now, use the HTML version
    generateReceipt(donationData)
  } catch (error) {
    console.error("PDF generation error:", error)
    generateReceipt(donationData)
  }
}
