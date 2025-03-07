import findDhsForm from '../assets/images/find-dhs-form.jpg';

interface AltTagDemoProps {
  altType: 'decorative' | 'descriptive';
}

export const AltTagDemo = ({ altType }: AltTagDemoProps) => {
  if (altType === 'decorative') {
    return (
      <div>
        <img
          src={findDhsForm}
          alt=""
          style={{ width: 'auto', height: '200px' }}
        />
        <p>
          This decorative image uses an empty alt tag: <code>alt=""</code>
        </p>
      </div>
    );
  }

  return (
    <div>
      <img
        src={findDhsForm}
        alt="Screenshot of DHS form search interface showing search filters and results"
        style={{ width: 'auto', height: '200px' }}
      />
      <p>
        This descriptive image uses a meaningful alt tag that describes the
        content
      </p>
    </div>
  );
};
