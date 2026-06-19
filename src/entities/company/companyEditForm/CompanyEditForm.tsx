import { useState } from 'react';
import { FormInput } from '../../../shared/ui/input/FormInput';
import styles from './CompanyEditForm.module.css';
import { CommonButton } from '../../../shared/ui/common-button/CommonButton';
import { RadioSelector } from '../../../shared/ui/radio-selector/RadioSelector';
import { Switcher } from '../../../shared/ui/switcher/Switcher';
import type { TCompany } from '../../../features/company/types/currentCompany';
import { COMPANY_TYPE } from '../../../shared/utils/companyTypes';

type CompanyEditFormProps = {
  currentCompany?: TCompany;
  onSubmit: (company: TCompany) => void;
};

export const EditCompanyForm = ({
  currentCompany,
  onSubmit
}: CompanyEditFormProps) => {
  const [title, setTitle] = useState(currentCompany?.title || '');
  const [inn, setInn] = useState(currentCompany?.inn || null);
  const [regNumber, setRegNumber] = useState(
    currentCompany?.registrationNumber || null
  );
  const [companyType, setCompanyType] = useState(
    currentCompany?.companyType || ''
  );
  const [hasBoardOfDirectors, setHasBoardOfDirectors] = useState(
    currentCompany?.hasBoardOfDirectors || false
  );

  function handleSubmit(e: React.SubmitEvent<HTMLButtonElement>) {
    e.preventDefault();
    onSubmit({
      id: currentCompany?.id || null,
      title,
      inn,
      registrationNumber: regNumber,
      companyType: COMPANY_TYPE[companyType],
      hasBoardOfDirectors
    });
  }

  return (
    <form className={styles.edit_form}>
      <FormInput
        label='Название компании'
        value={title ? title : ''}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Введите название компании'
      />
      <FormInput
        label='ИНН'
        value={inn ? String(inn) : ''}
        onChange={(e) => setInn(Number(e.target.value))}
        placeholder='Введите ИНН'
      />
      <FormInput
        label='ОГРН'
        value={regNumber ? String(regNumber) : ''}
        onChange={(e) => setRegNumber(Number(e.target.value))}
        placeholder='Введите ОГРН'
      />
      <Switcher
        label='Совет директоров'
        defaultChecked={hasBoardOfDirectors}
        value={hasBoardOfDirectors}
        onChange={(e) => setHasBoardOfDirectors(e.target.checked)}
      />

      <RadioSelector
        id='CompanyOrganizationForm'
        options={[
          {
            value: 'LLC',
            label: 'ООО'
          },
          {
            value: 'JSC',
            label: 'АО'
          }
        ]}
        onChange={(e) => setCompanyType(e.target.value)}
        value={companyType}
        row
        label='Организационная форма'
      />
      <CommonButton color='secondary' onClick={handleSubmit}>
        Сохранить компанию
      </CommonButton>
    </form>
  );
};
