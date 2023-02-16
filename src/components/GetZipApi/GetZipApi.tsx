import DaumPostcode, { Address } from 'react-daum-postcode';
import './GetZipApi.css';

type Props = {
  complteSerchZipHandle: (fullAdress: string, zip: string) => void;
};

const GetZipApi = ({ complteSerchZipHandle }: Props) => {
  const complete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    complteSerchZipHandle(fullAddress, data.zonecode);
  };

  return (
    <div>
      <DaumPostcode
        style={{ width: '100%', height: '100%' }}
        className="postmodal"
        autoClose
        onComplete={complete}
      />
    </div>
  );
};

export default GetZipApi;
