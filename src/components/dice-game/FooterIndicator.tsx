
interface FooterIndicatorProps {
  currentItemIndex: number;
  totalItems: number;
}

export default function FooterIndicator({ currentItemIndex, totalItems }: FooterIndicatorProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-coasters-green p-4">
      <div className="text-white text-center">
        <p className="text-sm">
          Roll {currentItemIndex + 1} of {totalItems}
        </p>
      </div>
    </div>
  );
}
