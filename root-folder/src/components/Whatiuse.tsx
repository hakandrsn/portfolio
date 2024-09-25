import whatiuseData from '../constants/whatiuse.json';

export const Whatiuse = () => {
    return (
        <div className="mt-36 p-6  shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold mb-6">Ne Kullanırım</h2>
            <div className="space-y-6">
                <div className="p-6 border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Ana Diller</h3>
                    <div className="flex flex-wrap gap-2">
                        {whatiuseData.mainLanguages.map((lang, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-6 border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Alt Diller</h3>
                    <div className="flex flex-wrap gap-2">
                        {whatiuseData.subLanguages.map((lang, index) => (
                            <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                {lang}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="p-6 border rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Ana Frameworkler</h3>
                    <div className="flex flex-wrap gap-2">
                        {whatiuseData.frameworks.map((framework, index) => (
                            <span key={index} className="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                {framework}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};