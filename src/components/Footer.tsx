




const Footer = () => {
  return (
    <footer className="border-t border-green-100 bg-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
        
        
        <div className="flex items-center gap-3">
         
          <div>
            
            <p className="text-xs text-black">
             বাজার-দর প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>
        </div>

       
        <div className="text-center sm:text-right">
          <p className="text-xs text-black">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;