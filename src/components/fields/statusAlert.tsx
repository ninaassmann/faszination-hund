export const FciStatusAlert: React.FC = () => {
  return (
    <div className="p-4 mb-4 border-l-4 border-yellow-500 bg-yellow-100 text-yellow-800">
      {' '}
      Wenn &quot;Nicht anerkannt&quot; ausgewählt wird, bleiben die übrigen FCI-Felder ausgeblendet,
      da diese Informationen nur für anerkannte oder provisorisch anerkannte Rassen relevant
      sind.{' '}
    </div>
  )
}
