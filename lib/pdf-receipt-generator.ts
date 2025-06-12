// Enhanced PDF receipt generator with beautiful UI design
export function generatePDFReceipt(donationData: any) {
  // Create a more sophisticated receipt content
  const receiptHTML = `
    <!DOCTYPE html>
    <html lang="bn">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>দান রসিদ - হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@400;600;700&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Noto Sans Bengali', sans-serif;
                background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                padding: 20px;
                color: #1e3a8a;
            }
            
            .receipt-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                position: relative;
            }
            
            .receipt-header {
                background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                color: white;
                padding: 30px;
                text-align: center;
                position: relative;
            }
            
            .receipt-header::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23islamic-pattern)"/></svg>');
                opacity: 0.3;
            }
            
            .org-logo {
                width: 80px;
                height: 80px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                margin: 0 auto 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                position: relative;
                z-index: 1;
            }
            
            .org-name {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 10px;
                position: relative;
                z-index: 1;
            }
            
            .org-subtitle {
                font-size: 16px;
                opacity: 0.9;
                position: relative;
                z-index: 1;
            }
            
            .receipt-title {
                background: #1e3a8a;
                color: white;
                padding: 20px;
                text-align: center;
                font-size: 24px;
                font-weight: 600;
            }
            
            .receipt-body {
                padding: 40px;
            }
            
            .receipt-info {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 30px;
                margin-bottom: 30px;
            }
            
            .info-section {
                background: #f8fafc;
                padding: 20px;
                border-radius: 12px;
                border-left: 4px solid #059669;
            }
            
            .info-title {
                font-size: 18px;
                font-weight: 600;
                color: #1e3a8a;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
            }
            
            .info-title::before {
                content: '●';
                color: #059669;
                margin-right: 8px;
            }
            
            .info-item {
                margin-bottom: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .info-label {
                font-weight: 600;
                color: #374151;
            }
            
            .info-value {
                color: #1f2937;
                text-align: right;
            }
            
            .amount-section {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                padding: 25px;
                border-radius: 15px;
                text-align: center;
                margin: 30px 0;
                border: 2px solid #f59e0b;
            }
            
            .amount-label {
                font-size: 18px;
                color: #92400e;
                margin-bottom: 10px;
            }
            
            .amount-value {
                font-size: 36px;
                font-weight: 700;
                color: #92400e;
            }
            
            .receipt-footer {
                background: #f1f5f9;
                padding: 30px;
                text-align: center;
                border-top: 2px dashed #cbd5e1;
            }
            
            .thank-you {
                font-size: 20px;
                font-weight: 600;
                color: #059669;
                margin-bottom: 10px;
            }
            
            .dua {
                font-size: 16px;
                color: #374151;
                font-style: italic;
                margin-bottom: 20px;
            }
            
            .contact-info {
                font-size: 14px;
                color: #6b7280;
                line-height: 1.6;
            }
            
            .receipt-id {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.9);
                padding: 10px 15px;
                border-radius: 8px;
                font-size: 12px;
                color: #1e3a8a;
                font-weight: 600;
            }
            
            .decorative-border {
                height: 4px;
                background: linear-gradient(90deg, #059669, #10b981, #34d399, #10b981, #059669);
                margin: 20px 0;
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
            <div class="receipt-id">রসিদ নং: ${donationData.donationId}</div>
            
            <div class="receipt-header">
                <div class="org-logo">🕌</div>
                <div class="org-name">হাছিরপাড়া ইসলামী সমাজকল্যাণ পরিষদ</div>
                <div class="org-subtitle">হাছিরপাড়ার ইসলামী সমাজ ও মানুষের কল্যাণে নিবেদিত</div>
            </div>
            
            <div class="receipt-title">দান রসিদ</div>
            
            <div class="receipt-body">
                <div class="receipt-info">
                    <div class="info-section">
                        <div class="info-title">দানকারীর তথ্য</div>
                        <div class="info-item">
                            <span class="info-label">নাম:</span>
                            <span class="info-value">${donationData.donorName}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">ফোন:</span>
                            <span class="info-value">${donationData.phone}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">ঠিকানা:</span>
                            <span class="info-value">${donationData.address}</span>
                        </div>
                    </div>
                    
                    <div class="info-section">
                        <div class="info-title">লেনদেনের তথ্য</div>
                        <div class="info-item">
                            <span class="info-label">তারিখ:</span>
                            <span class="info-value">${donationData.date}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">সময়:</span>
                            <span class="info-value">${donationData.time}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">পেমেন্ট মেথড:</span>
                            <span class="info-value">${donationData.paymentMethod}</span>
                        </div>
                        <div class="info-item">
                            <span class="info-label">ট্রানজেকশন আইডি:</span>
                            <span class="info-value">${donationData.transactionId}</span>
                        </div>
                    </div>
                </div>
                
                <div class="amount-section">
                    <div class="amount-label">দানের পরিমাণ</div>
                    <div class="amount-value">৳${donationData.amount.toLocaleString("bn-BD")}</div>
                </div>
                
                <div class="decorative-border"></div>
            </div>
            
            <div class="receipt-footer">
                <div class="thank-you">আপনার দানের জন্য ধন্যবাদ!</div>
                <div class="dua">আল্লাহ তায়ালা আপনাকে উত্তম প্রতিদান দান করুন</div>
                
                <div class="contact-info">
                    <strong>যোগাযোগ:</strong><br>
                    ফোন: +৮৮০ ১৭১২-৩৪৫৬৭৮ | ইমেইল: info@islamicwelfare.org<br>
                    ঠিকানা: গ্রাম: সুখছড়ী হাছিরপাড়া, উপজেলা: লোহাগাড়া, জেলা: চট্টগ্রাম
                </div>
            </div>
        </div>
    </body>
    </html>
  `

  // Create a new window for printing
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(receiptHTML)
    printWindow.document.close()

    // Wait for content to load then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 500)
    }
  }

  // Also create a downloadable HTML file
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
