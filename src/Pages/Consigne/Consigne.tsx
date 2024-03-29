import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../Layout/Ui/Layout'
import { useAddProduct } from '../../api/customer_product'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { buildFormData } from '../../api/helper/buildFormData'
import File from './File';
import { Button, Form } from 'react-bootstrap';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md'

const Consigne = () => {

  const [Name , setName] = useState('') 
  const [Description , setDescription] = useState('') 
  const [Price , setPrice] = useState('') 

  const [Email , setEmail] = useState('') 
  const [Message , setMessage] = useState('') 

  const {mutate , isSuccess} = useAddProduct()
  const form = useRef<any>(null);
  const { t } = useTranslation();
  const handelSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log(form.current);

    if(!Name || !Description || !Message || !Price || !ClearIMageCoins || !ClearIMageCoins2 ){
      toast.error(t("please_fill_all_input"))
      return;
    }
console.log(getDataToSend({
  name:Name,
  description:Description,
  note:Message,
  price:Price,
  image:ClearIMageCoins,
  image2:ClearIMageCoins2,

}));

    mutate(getDataToSend({
      name:Name,
      description:Description,
      note:Message,
      price:Price,
      image:ClearIMageCoins,
      image2:ClearIMageCoins2,

    }))
  }
   const getDataToSend = (values: any): FormData => {
    const data = { ...values };
    
  
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };
  
  
  
  useEffect(()=>{

    if(isSuccess){
      toast.success(t('message_send_successfully'))
      setMessage('')
      setName('')
      setEmail('')
      setPrice('')
      setClearIMageCoins("")
setClearIMageCoins2("")
    }
  },[isSuccess])
  const [ClearIMageCoins, setClearIMageCoins] = useState('')
  const [ClearIMageCoins2, setClearIMageCoins2] = useState('')

  return (
    <Layout>
        <div className='title_container'>
          <h1 className='title'>How to consign</h1>
          <p className='text'>If you are interested in consigning, we look forward to helping you. Send us photos, contact us by phone/email, or visit us at our office.</p>
        </div>

        <div className='body_contact'>
          <div className='form_container'>
            <p>Upload Photos</p>
            <File label={t("ClearIMageCoins")} set={setClearIMageCoins} />
            <File label={t("ClearIMageCoins2")} set={setClearIMageCoins2} />
            
          </div>

          <div className='messages'>
            <p>Write your messages</p>
            <Form className='form' ref={form} onSubmit={handelSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>{t('Coin Name')}</Form.Label>
                <Form.Control className='consign_input' type="text" name="to_name" placeholder={t('enter Coin Name')} value={Name} onChange={(e)=>setName(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formDesc">
                <Form.Label>{t('Coin Description')}</Form.Label>
                <Form.Control className='consign_input' type="text" name="description" placeholder={t('enter Coin description')} value={Description} onChange={(e)=>setDescription(e.target.value)}/>
              </Form.Group>
              <Form.Group controlId="formPrice">
                <Form.Label>{t('Coin Price')}</Form.Label>
                <Form.Control className='consign_input' type="number" name="price" placeholder={t('enter coin price')} value={Price} onChange={(e)=>setPrice(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="formMessage">
                <Form.Label>{t('Your Message')}</Form.Label>
                <Form.Control className='consign_input' as="textarea" rows={4} name="note" placeholder={t('type Your Message')} value={Message} onChange={(e)=>setMessage(e.target.value)}/>
              </Form.Group>

              <div className='button_container'>
                <Button className='mt-4 button' type="submit">
                  {t('Submit')}<MdKeyboardDoubleArrowRight/>
                </Button>
              </div>
              </Form>
            </div>

          <div className='consign_contact'>
            <p className='title'>Contact</p>
            <p className='p'>Phone: <span>0958 261 912</span> </p>
            <p className='p'>Email: <span>emai@email.com</span> </p>
            <p className='p'>Address: <span>damascus mazzeh</span></p>
          </div>
        </div>
    </Layout>
  )
}

export default Consigne