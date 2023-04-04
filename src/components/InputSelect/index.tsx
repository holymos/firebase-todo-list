import { CaretRight } from 'phosphor-react';
import { useState } from 'react';

import * as S from './styles';

interface IProps {
  label?: string;
  options: string[];
  selectedIndex: number;
  onSelect: (filter: number) => void;
}

export const InputSelect: React.FC<IProps> = ({
  label,
  options,
  onSelect,
  selectedIndex,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <S.Container
      isOpen={isOpen}
      onClick={() => setIsOpen(!isOpen)}
      data-testid="Select"
    >
      {isOpen && <S.Backdrop onClick={() => setIsOpen(false)} />}

      <S.Dropdown isOpen={isOpen}>
        <S.Selected>
          <p>
            {!options[selectedIndex] && label ? label : options[selectedIndex]}
          </p>

          <S.AheadIcon isOpen={isOpen}>
            <CaretRight />
          </S.AheadIcon>
        </S.Selected>

        {isOpen &&
          options.map((item, index) => {
            if (index !== selectedIndex) {
              return (
                <li onClick={() => onSelect(index)} key={item}>
                  <p>{item}</p>
                </li>
              );
            }
          })}
      </S.Dropdown>
    </S.Container>
  );
};
