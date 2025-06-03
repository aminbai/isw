// Enhanced receipt generator with beautiful color theory and UI design
export function generateReceipt(donationData: any) {
  const receiptHTML = `
<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>দান রসিদ - ${donationData.donationId}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Bengali:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Noto Sans Bengali', sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .receipt-container {
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            overflow: hidden;
            width: 100%;
            max-width: 650px;
            position: relative;
        }
        
        .receipt-header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 40px 30px;
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
                transparent 15px,
                rgba(255,255,255,0.1) 15px,
                rgba(255,255,255,0.1) 30px
            );
            animation: pattern-move 25s linear infinite;
        }
        
        @keyframes pattern-move {
            0% { transform: translateX(-60px) translateY(-60px); }
            100% { transform: translateX(0px) translateY(0px); }
        }
        
        .org-logo {
            width: 100px;
            height: 100px;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            margin: 0 auto 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
            position: relative;
            z-index: 2;
            border: 3px solid rgba(255,255,255,0.3);
        }
        
        .org-name {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 12px;
            position: relative;
            z-index: 2;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .org-subtitle {
            font-size: 18px;
            opacity: 0.95;
            position: relative;
            z-index: 2;
            font-weight: 300;
        }
        
        .receipt-body {
            padding: 50px 40px;
            background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
        }
        
        .receipt-title {
            text-align: center;
            font-size: 28px;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 40px;
            position: relative;
        }
        
        .receipt-title::after {
            content: '';
            position: absolute;
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: linear-gradient(90deg, #10b981, #3b82f6);
            border-radius: 2px;
        }
        
        .receipt-info {
            display: grid;
            gap: 25px;
            margin-bottom: 40px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 25px;
            background: white;
            border-radius: 12px;
            border-left: 5px solid #10b981;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
        }
        
        .info-row:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        }
        
        .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 180px;
            display: flex;
            align-items: center;
        }
        
        .info-label::before {
            content: '●';
            color: #10b981;
            margin-right: 10px;
            font-size: 12px;
        }
        
        .info-value {
            font-weight: 500;
            color: #1f2937;
            text-align: right;
            flex: 1;
            font-size: 16px;
        }
        
        .amount-highlight {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: white !important;
            font-size: 20px !important;
            font-weight: 700 !important;
            border-left: 5px solid #047857 !important;
            position: relative;
            overflow: hidden;
        }
        
        .amount-highlight::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 30px 30px 0;
            border-color: transparent #047857 transparent transparent;
        }
        
        .amount-highlight .info-label::before {
            color: white;
        }
        
        .receipt-footer {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 40px 30px;
            text-align: center;
            border-top: 3px dashed #cbd5e0;
            position: relative;
        }
        
        .thank-you {
            font-size: 24px;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 15px;
            position: relative;
        }
        
        .dua {
            font-size: 18px;
            color: #4a5568;
            font-style: italic;
            margin-bottom: 25px;
            font-weight: 300;
        }
        
        .receipt-id {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255,255,255,0.25);
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
        }
        
        .contact-info {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-top: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        
        .contact-info h4 {
            color: #1a202c;
            font-weight: 600;
            margin-bottom: 10px;
            font-size: 16px;
        }
        
        .contact-details {
            font-size: 14px;
            color: #4a5568;
            line-height: 1.8;
        }
        
        .verification-code {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            padding: 15px;
            border-radius: 10px;
            margin-top: 20px;
            text-align: center;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            letter-spacing: 2px;
        }
        
        .print-date {
            position: absolute;
            bottom: 10px;
            right: 20px;
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
                border: 2px solid #e5e7eb;
                max-width: none;
                width: 100%;
            }
        }
        
        .qr-placeholder {
            width: 80px;
            height: 80px;
            background: #f3f4f6;
            border: 2px dashed #d1d5db;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            font-size: 12px;
            color: #6b7280;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <div class="receipt-header">
            <div class="receipt-id">রসিদ নং: ${donationData.donationId}</div>
            <div class="org-logo">🕌</div>
            <div class="org-name">ইসলামী সমাজকল্যাণ পরিষদ</div>
            <div class="org-subtitle">গ্রামীণ সমাজের উন্নয়নে নিবেদিত একটি অরাজনৈতিক ও অলাভজনক সংস্থা</div>
        </div>
        
        <div class="receipt-body">
            <h2 class="receipt-title">দান রসিদ</h2>
            
            <div class="receipt-info">
                <div class="info-row">
                    <span class="info-label">দানকারীর নাম</span>
                    <span class="info-value">${donationData.donorName}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">মোবাইল নম্বর</span>
                    <span class="info-value">${donationData.phone}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">ঠিকানা</span>
                    <span class="info-value">${donationData.address}</span>
                </div>
                
                <div class="info-row amount-highlight">
                    <span class="info-label">দানের পরিমাণ</span>
                    <span class="info-value">৳${donationData.amount?.toLocaleString()} টাকা</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">পেমেন্ট মেথড</span>
                    <span class="info-value">${
                      donationData.paymentMethod === "bkash"
                        ? "বিকাশ (bKash)"
                        : donationData.paymentMethod === "nagad"
                          ? "নগদ (Nagad)"
                          : "ব্যাংক ট্রান্সফার"
                    }</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">ট্রানজেকশন আইডি</span>
                    <span class="info-value">${donationData.transactionId}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">তারিখ ও সময়</span>
                    <span class="info-value">${donationData.date} - ${donationData.time}</span>
                </div>
            </div>
            
            <div class="verification-code">
                যাচাইকরণ কোড: ${donationData.donationId.split("-")[1]}
            </div>
        </div>
        
        <div class="receipt-footer">
            <div class="thank-you">আপনার দানের জন্য আন্তরিক ধন্যবাদ!</div>
            <div class="dua">আল্লাহ তা'আলা আপনাকে উত্তম প্রতিদান দিন এবং আপনার সম্পদে বরকত দান করুন</div>
            
            <div class="qr-placeholder">
                QR কোড<br>
                (যাচাইয়ের জন্য)
            </div>
            
            <div class="contact-info">
                <h4>যোগাযোগের তথ্য</h4>
                <div class="contact-details">
                    📞 ফোন: +৮৮০ ১৮১৭১২২২৩২<br>
                    ✉️ ইমেইল: info@islamicwelfare.org<br>
                    🏠 ঠিকানা: গ্রাম: হাছিরপাড়া, উপজেলা: লোহাগাড়া, জেলা: চট্টগ্রাম<br>
                    🌐 ওয়েবসাইট: www.islamicwelfare.org
                </div>
            </div>
            
            <div class="print-date">
                মুদ্রণ: ${new Date().toLocaleDateString("bn-BD")} ${new Date().toLocaleTimeString("bn-BD")}
            </div>
        </div>
    </div>
    
    <script>
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
  const printWindow = window.open("", "_blank", "width=900,height=1000")
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
