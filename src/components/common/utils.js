import FormInputFile from "./fileSelector";
import FormArrayInput from "./formArrayInput";
import FormCheckbox from "./formCheckBox";
import FormInput from "./formInput";
import * as Yup from "yup";
import countries from '../api/countries.json'
import SelectInput from "./formSelect";
import PackageCard from "./packageCard";
import { useTranslation } from "react-i18next";

import FormCheckboxMultiple from "./formCheckBoxMultiple";


const brandPlans = [
    {
        name: "Basic",
        price: "Custom Price",
        limit: 50,
        collaboration: 5,
        features: "1 day",
        deliveryProviders: 1,
        emailSmsMarketing: 10,
        transactionFee: "4% per transaction"
    },
    {
        name: "Premium",
        price: "Custom Price",
        limit: 100,
        collaboration: 10,
        features: "6 days",
        deliveryProviders: 3,
        emailSmsMarketing: 50,
        transactionFee: "3% per transaction"
    },
    {
        name: "Pro",
        price: "Custom Price",
        limit: "Unlimited",
        collaboration: "Unlimited",
        features: "2 weeks",
        deliveryProviders: "Unlimited",
        emailSmsMarketing: 100,
        transactionFee: "2% per transaction"
    }
];
const getBrandDetailsSchema = (currentStep, isBrand, mainSubCat = [], subCategory = [], t) => {
    return Yup.object().shape({
        name: Yup.string().required(t("validation.brandNameRequired")),
        website: Yup.string().required(t("validation.websiteRequired")),
        sub_main_category: mainSubCat?.length > 0 ? Yup.string().required(t("validation.subMainCategoryRequired")) : Yup.string(),
        subcategory: subCategory?.length > 0 ?
            Yup.array().min(1, t("validation.subCategoryMin")).required(t("validation.subCategoryRequired")) :
            Yup.array(),
        representative: currentStep === 3 ? Yup.object().shape({
            fullName: Yup.string().required(t("validation.fullNameRequired")),
            email: Yup.string().required(t("validation.emailRequired")),
            phone: Yup.string().required(t("validation.phoneRequired")),
            position: Yup.string(),
        }) : Yup.object(),
        category: currentStep === 4 ? Yup.string().required(t("validation.categoryRequired")) : Yup.string(),
        targetAudience: currentStep === 4 ? Yup.object().shape({
            ageGroup: Yup.string().matches(/^\d{1,2}-\d{1,2}$/, t("validation.ageGroupFormat")),
            gender: Yup.string(),
            interests: Yup.array(),
        }) : Yup.object(),
        customerSupport: Yup.object().shape({
            email: Yup.string().email(t("validation.invalidEmail")),
            phone: Yup.string(),
        }),
        legal_docs: (currentStep === 5 && isBrand) ? Yup.object().shape({
            registration_certificate: Yup.string(),
            taxId: Yup.string().required(t("validation.taxIdRequired")),
        }) : Yup.object()
    });
};
const getInfluencerDetailsSchema = (currentStep, isInfluencer, t) => {

    return Yup.object().shape({
        bio: Yup.string().required(t("validation.bioRequired")),
        dateOfBirth: Yup.date().required(t("validation.dobRequired")),
        nationality: Yup.string().required(t("validation.nationalityRequired")),
        audience_info: currentStep === 3 ? Yup.object().shape({
            ageGroup: Yup.string().matches(/^\d{1,2}-\d{1,2}$/, t("validation.ageGroupFormat")),
            location: Yup.array(),
            interests: Yup.array(),
        }) : Yup.object(),
        content_cats: Yup.array(),
        content_type: Yup.array(),
        social_media_info: Yup.array().of(
            Yup.object().shape({
                platform: Yup.string(),
                username: Yup.string(),
                followers: Yup.number().min(0, t("validation.followersMin")),
                avg_engagement_rate: Yup.number().min(0, t("validation.engagementRateMin")),
                monthly_reach: Yup.number().min(0, t("validation.monthlyReachMin")),
            })
        ),
        profile_image: Yup.string(),
        legal_docs: (currentStep === 5 && isInfluencer) ? Yup.object().shape({
            nationalId: Yup.string().required(t("validation.nationalIdRequired")),
            taxNumber: Yup.string().required(t("validation.taxIdRequired")),
        }) : Yup.object()
    });
};
const getRiderDetailsSchema = (currentStep, isRider, t) => {

    return Yup.object().shape({
        businessType: Yup.string().required(t("validation.businessTypeRequired")),
        website: Yup.string().nullable(),
        primary_contact: currentStep === 3 ? Yup.object().shape({
            name: Yup.string().required(t("validation.fullNameRequired")),
            email: Yup.string().email(t("validation.invalidEmail")).required(t("validation.emailRequired")),
            phone: Yup.string().required(t("validation.phoneRequired")),
            position: Yup.string().required(t("validation.positionRequired")),
        }) : Yup.object(),
        serviceArea: currentStep === 3
            ? Yup.array().min(1, "At Least One Service Area is required")
            : Yup.array(),

        deliveryServices: currentStep === 3
            ? Yup.array().min(1, "At Least One Delivery Service is required")
            : Yup.array(),

        shippingRates: currentStep === 4 ? Yup.object().shape({
            standard: Yup.number().min(0, t("validation.positiveNumber")),
            express: Yup.number().min(0, t("validation.positiveNumber")),
            international: Yup.number().min(0, t("validation.positiveNumber")),
        }) : Yup.object(),

        delivery_time: currentStep === 4 ? Yup.object().shape({
            standard: Yup.string().required(t("validation.standardDeliveryTimeRequired")),
            express: Yup.string().required(t("validation.expressDeliveryTimeRequired")),
            international: Yup.string().required(t("validation.internationalDeliveryTimeRequired")),
        }) : Yup.object(),
        packaging: Yup.object().shape({
            standard: Yup.boolean(),
            custom: Yup.boolean(),
        }),
        tracking: Yup.object().shape({
            is_number_provided: Yup.boolean(),
            is_real_Time: Yup.boolean(),
        }),
        order_capacity: Yup.number().min(0, t("validation.positiveNumber")),
        deliveryVehicles: currentStep === 4
            ? Yup.object().shape({
                fleetSize: Yup.number().min(0, t("validation.positiveNumber")),
                vehicleTypes: Yup.array().min(1, t("validation.vehicleTypeRequired"))
            })
            : Yup.object(),

        availability: currentStep === 4
            ? Yup.array().min(1, t("validation.availabilityRequired"))
            : Yup.array(),

        insurance_coverage: Yup.object().shape({
            amount: Yup.number().min(0, t("validation.positiveNumber")),
            details: Yup.string().nullable(),
        }),
        return_process: currentStep === 5 ? Yup.object().shape({
            is_customer_responsible: Yup.boolean(),
            policy: Yup.string().required(t("validation.returnPolicyRequired")),
        }) : Yup.object(),
        customerSupport: Yup.object().shape({
            email: Yup.string().email(t("validation.invalidEmail")),
            phone: Yup.string(),
        }),
        legal_docs: (currentStep === 5 && isRider) ? Yup.object().shape({
            nationalId: Yup.string().required(t("validation.nationalIdRequired")),
            taxNumber: Yup.string().required(t("validation.taxIdRequired")),
        }) : Yup.object()
    });
};
const brandForm = ({ control, clearErrors, errors, category = [], subCategory = [], mainSubCat = [], t, currentStep, setValue }) => {

    return (
        <>

            {/* Step 2 */}
            {/* <div className="col-span-6">
                <h6 className="mb-0 mt-2 popins_medium">{t("auth.signup.form.brandInfo")}</h6>
            </div> */}
            {currentStep === 2 &&
                <>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="name"
                            label={t("auth.signup.form.brandName")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.name?.message}
                            placeholder={t("auth.signup.form.brandNamePlaceholder")}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="website"
                            label={t("auth.signup.form.brandWebsite")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.website?.message}
                            placeholder={t("auth.signup.form.brandWebsitePlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="description"
                            label={t("auth.signup.form.brandDescription")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.description?.message}
                            placeholder={t("auth.signup.form.brandDescriptionPlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="businessType"
                            label={t("auth.signup.form.brandType")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.businessType?.message}
                            placeholder={t("auth.signup.form.brandTypePlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 ">
                        <SelectInput
                            name="countryOfOperation"
                            label={t("auth.signup.form.brandCountryOfOperation")}
                            control={control}
                            errors={errors}
                            options={countries?.map((item => ({ value: item, label: item })))}
                            placeholder={t("auth.signup.form.selectCountry")}
                        />
                    </div>
                </>}
            {/* <div className="col-span-6">
                <h6 className="mb-0 mt-2 popins_medium">{t("auth.signup.form.brandRepInfo")}</h6>
            </div> */}
            {/* Step 3 */}
            {currentStep === 3 &&
                <>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="representative.fullName"
                            label={t("auth.signup.form.fullName")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.representative?.fullName?.message}
                            placeholder={t("auth.signup.form.fullNamePlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="representative.email"
                            label={t("auth.signup.form.email")}
                            control={control}
                            type="email"
                            errors={errors}
                            directlyError={errors?.representative?.email?.message}
                            placeholder={t("auth.signup.form.emailPlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="representative.phone"
                            label={t("auth.signup.form.phoneNumber")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.representative?.phone?.message}
                            placeholder={t("auth.signup.form.phoneNumberPlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="representative.position"
                            label={t("auth.signup.form.repPosition")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.representative?.position?.message}
                            placeholder={t("auth.signup.form.repPositionPlaceholder")}
                        />
                    </div>
                </>
            }
            {/* Step 4 */}
            {currentStep === 4 &&
                <>
                    <div className="col-span-6">
                        <FormInput
                            name="annualRevenue"
                            label={t("auth.signup.form.brandAnnualRevenue")}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.annualRevenue?.message}
                            placeholder={t("auth.signup.form.brandAnnualRevenuePlaceholder")}
                        />
                    </div>
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t("auth.signup.form.productCategories")}</h6>
                    </div>
                    <div className="col-span-6">
                        <SelectInput
                            name="category"
                            label={t("auth.signup.form.category")}
                            control={control}
                            errors={errors}
                            options={category?.map((item => ({ label: item?.name, value: item?._id })))}
                            placeholder={t("auth.signup.form.selectCategory")}
                        />
                    </div>
                    {mainSubCat?.length > 0 &&
                        <div className="col-span-6">
                            <SelectInput
                                name="sub_main_category"
                                label={t("auth.signup.form.subMainCategory")}
                                control={control}
                                errors={errors}
                                options={mainSubCat?.map((item => ({ label: item?.name, value: item?._id })))}
                                placeholder={t("auth.signup.form.selectSubMainCategory")}
                            />
                        </div>}
                    {subCategory?.length > 0 &&
                        <div className="col-span-6">
                            <FormCheckboxMultiple
                                name="subcategory"
                                label={t("auth.signup.form.subCategory")}
                                control={control}
                                errors={errors}
                                classes="mb-2"
                                data={subCategory} // Pass subcategory array
                            />
                        </div>
                    }
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t("auth.signup.form.targetAudience")}</h6>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="targetAudience.ageGroup"
                            label={t("auth.signup.form.ageGroup")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.targetAudience?.ageGroup?.message}
                            placeholder={t("auth.signup.form.ageGroupPlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <SelectInput
                            name="targetAudience.gender"
                            label={t("auth.signup.form.gender")}
                            control={control}
                            errors={errors}
                            options={['Female', 'Male', 'Kids'].map((item => ({ label: item, value: item })))}
                            placeholder={t("auth.signup.form.selectGender")}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="targetAudience.interests"
                            label={t("auth.signup.form.audienceInterests")}
                            control={control}
                            errors={errors}
                            btnLabel={t("auth.signup.form.interests")}
                            fields={[{ label: t('auth.signup.form.audienceInterests'), value: '' }]}
                            isMulti={false}
                        />
                    </div>
                </>}
            {currentStep === 5 &&
                <>
                    {/* Step 5 */}
                    <div className="col-span-6">
                        <FormInput
                            name="legal_docs.taxId"
                            label={t('auth.signup.form.taxId')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.legal_docs?.taxId?.message}
                            placeholder={t('auth.signup.form.taxIdPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputFile
                            name="legal_docs.registration_certificate"
                            label={t('auth.signup.form.registration_certificate')}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            directlyError={errors?.legal_docs?.registration_certificate?.message}
                            placeholder={t('auth.signup.form.registrationCertificatePlaceholder')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInputFile
                            name="logo"
                            label={t('auth.signup.form.logo')}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            directlyError={errors?.logo?.message}
                            placeholder={t('auth.signup.form.logoPlaceholder')}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t("auth.signup.form.customerSupport")}</h6>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="customerSupport.email"
                            label={t("auth.signup.form.email")}
                            control={control}
                            errors={errors}
                            type="email"
                            directlyError={errors?.customerSupport?.email?.message}
                            placeholder={t("auth.signup.form.emailPlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="customerSupport.phone"
                            label={t("auth.signup.form.phoneNumber")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.customerSupport?.phone?.message}
                            placeholder={t("auth.signup.form.phoneNumberPlaceholder")}
                        />
                    </div>
                </>
            }
        </>
    );
};


const influencerForm = ({ control, clearErrors, errors, t, currentStep, setValue }) => {

    return (
        <>
            {/* step 2 */}
            {currentStep == 2 &&
                <>
                    <div className="col-span-6">
                        <FormInput
                            name="bio"
                            label={t('auth.signup.form.bio')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.bio?.message}
                            placeholder={t('auth.signup.form.bioPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="dateOfBirth"
                            label={t('auth.signup.form.dateOfBirth')}
                            type="date"
                            control={control}
                            errors={errors}
                            directlyError={errors?.dateOfBirth?.message}
                            placeholder={t('auth.signup.form.dateOfBirthPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <SelectInput
                            name="nationality"
                            label={t('auth.signup.form.nationality')}
                            control={control}
                            errors={errors}
                            options={countries?.map(item => ({ value: item, label: item }))}
                            placeholder={t('auth.signup.form.nationalityPlaceholder')}
                        />
                    </div>
                </>}

            {/* <div className="col-span-6">
                <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.audienceAgeGroup')}:</h6>
            </div> */}
            {currentStep == 3 &&
                <>

                    <div className="col-span-6">
                        <FormInput
                            name="audience_info.ageGroup"
                            label={t('auth.signup.form.audienceAgeGroup')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.audience_info?.ageGroup?.message}
                            placeholder={t('auth.signup.form.audienceAgeGroupPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="audience_info.location"
                            label={t('auth.signup.form.audienceLocation')}
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.locationBtnLabel')}
                            fields={[{ label: t('auth.signup.form.audienceLocation'), value: '' }]}
                            isMulti={false}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="audience_info.interests"
                            label={t('auth.signup.form.audienceInterests')}
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.interestsBtnLabel')}
                            fields={[{ label: t('auth.signup.form.audienceInterests'), value: '' }]}
                            isMulti={false}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="content_cats"
                            label={t('auth.signup.form.contentCategory')}
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.categoryBtnLabel')}
                            fields={[{ label: t('auth.signup.form.contentCategory'), value: '' }]}
                            isMulti={false}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInputFile
                            name="profile_image"
                            label={t('auth.signup.form.profilePhoto')}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            directlyError={errors?.profile_image?.message}
                            placeholder={t('auth.signup.form.profilePhotoPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputFile
                            name="cover_image"
                            label={'Upload Cover Image'}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            directlyError={errors?.cover_image?.message}
                            placeholder={'Upload Cover Image'}
                        />
                    </div>
                </>}
            {currentStep == 4 &&
                <>
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.contentType')}:</h6>
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="content_type"
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.typeBtnLabel')}
                            fields={[{ label: t('auth.signup.form.contentType'), value: '' }]}
                            isMulti={false}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.socialMediaInfo')}:</h6>
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="social_media_info"
                            // label={t('auth.signup.form.socialMediaInfo')}
                            control={control}
                            errors={errors}
                            isMulti={true}
                            btnLabel={t('auth.signup.form.socialMediaBtnLabel')}
                            fields={[
                                { "label": t('auth.signup.form.socialMediaInstagram'), "value": "platform" },
                                { "label": t('auth.signup.form.socialMediaUsername'), "value": "username" },
                                { "label": t('auth.signup.form.socialMediaFollowers'), "value": "followers", "type": "number" },
                                { "label": t('auth.signup.form.socialMediaEngagementRate'), "value": "avg_engagement_rate", "type": "number" },
                                { "label": t('auth.signup.form.socialMediaMonthlyReach'), "value": "monthly_reach", "type": "number" }
                            ]}
                        />
                    </div>
                </>}

            {currentStep === 5 &&
                <>
                    <div className="col-span-6">
                        <FormInput
                            name="legal_docs.taxNumber"
                            label={t('auth.signup.form.taxNumber')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.legal_docs?.taxNumber?.message}
                            placeholder={t('auth.signup.form.taxNumberPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="legal_docs.nationalId"
                            label={t('auth.signup.form.nationalId')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.legal_docs?.nationalId?.message}
                            placeholder={t('auth.signup.form.nationalIdPlaceholder')}
                        />
                    </div>
                </>}
        </>
    );
}

const riderForm = ({ control, clearErrors, errors, deliveryServices = [], t, setValue, currentStep }) => {

    return (
        <>
            {/* Vehicle Section */}
            {/* step 2 */}
            {currentStep === 2 &&
                <>
                    <div className="col-span-6">
                        <FormInput
                            name="businessType"
                            label={t('auth.signup.form.businessType')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.businessType?.message}
                            placeholder={t('auth.signup.form.businessTypePlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="website"
                            label={t('auth.signup.form.website')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.website?.message}
                            placeholder={t('auth.signup.form.websitePlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputFile
                            name="logo"
                            label={'Logo'}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            directlyError={errors?.logo?.message}
                            placeholder={'Logo'}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInputFile
                            name="profile_image"
                            label={'Profile Image'}
                            control={control}
                            errors={errors}
                            setValue={setValue}
                            clearErrors={clearErrors}
                            directlyError={errors?.profile_image?.message}
                            placeholder={t('auth.signup.profileImagePlaceholder')}
                        />
                    </div>
                </>}
            {/* step 3 */}
            {currentStep === 3 &&
                <>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">Primary Contact</h6>
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="primary_contact.name"
                            label={t('auth.signup.form.primaryContact.name')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.primary_contact?.name?.message}
                            placeholder={t('auth.signup.form.primaryContact.name')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="primary_contact.email"
                            label={t('auth.signup.form.primaryContact.email')}
                            control={control}
                            type="email"
                            errors={errors}
                            directlyError={errors?.primary_contact?.email?.message}
                            placeholder={t('auth.signup.form.primaryContact.email')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="primary_contact.phone"
                            label={t('auth.signup.form.primaryContact.phone')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.primary_contact?.phone?.message}
                            placeholder={t('auth.signup.form.primaryContact.phone')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="primary_contact.position"
                            label={t('auth.signup.form.primaryContact.position')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.primary_contact?.position?.message}
                            placeholder={t('auth.signup.form.primaryContact.position')}
                        />
                    </div>
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.serviceArea')}</h6>
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="serviceArea"
                            label=""
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.serviceArea')}
                            fields={[{ label: t('auth.signup.form.serviceArea'), value: '' }]}
                            isMulti={false}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.deliveryService')}</h6>
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="deliveryServices"
                            label=""
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.deliveryService')}
                            fields={[{ label: t('auth.signup.form.deliveryService'), value: '' }]}
                            isMulti={false}
                        />
                    </div>
                </>}
            {/* step 4 */}
            {currentStep === 4 &&
                <>
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">Shipping Rates</h6>
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="shippingRates.standard"
                            label={t('auth.signup.form.shippingRates.standard')}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.shippingRates?.standard?.message}
                            placeholder={t('auth.signup.form.shippingRates.standard')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="shippingRates.express"
                            label={t('auth.signup.form.shippingRates.express')}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.shippingRates?.express?.message}
                            placeholder={t('auth.signup.form.shippingRates.express')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="shippingRates.international"
                            label={t('auth.signup.form.shippingRates.international')}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.shippingRates?.international?.message}
                            placeholder={t('auth.signup.form.shippingRates.international')}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">Delivery Time</h6>
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="delivery_time.standard"
                            label={t('auth.signup.form.deliveryTime.standard')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.delivery_time?.standard?.message}
                            placeholder={t('auth.signup.form.deliveryTime.standard')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="delivery_time.express"
                            label={t('auth.signup.form.deliveryTime.express')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.delivery_time?.express?.message}
                            placeholder={t('auth.signup.form.deliveryTime.express')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="delivery_time.international"
                            label={t('auth.signup.form.deliveryTime.international')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.delivery_time?.international?.message}
                            placeholder={t('auth.signup.form.deliveryTime.international')}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">Packages</h6>
                    </div>
                    <div className="col-span-6">
                        <FormCheckbox
                            name="packaging.standard"
                            label={t('auth.signup.form.packaging.standard')}
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormCheckbox
                            name="packaging.custom"
                            label={t('auth.signup.form.packaging.custom')}
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">Real Time Tracking</h6>
                    </div>
                    <div className="col-span-6">
                        <FormCheckbox
                            name="tracking.is_number_provided"
                            label={t('auth.signup.form.tracking.is_number_provided')}
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormCheckbox
                            name="tracking.is_real_time"
                            label={t('auth.signup.form.tracking.is_real_time')}
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="order_capacity"
                            label={t('auth.signup.form.orderCapacity')}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.order_capacity?.message}
                            placeholder={t('auth.signup.form.orderCapacity')}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.deliveryVehicles.fleetSize')}</h6>
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="deliveryVehicles.fleetSize"
                            label={t('auth.signup.form.deliveryVehicles.fleetSize')}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.deliveryVehicles?.fleetSize?.message}
                            placeholder={t('auth.signup.form.deliveryVehicles.fleetSize')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormArrayInput
                            name="deliveryVehicles.vehicleTypes"
                            label={t('auth.signup.form.deliveryVehicles.vehicleTypes')}
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.deliveryVehicles.vehicleTypes')}
                            fields={[{ label: t('auth.signup.form.deliveryVehicles.vehicleTypes'), value: '' }]}
                            isMulti={false}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.availability')}</h6>
                    </div>
                    <div className="col-span-6">
                        <FormArrayInput
                            name="availability"
                            control={control}
                            errors={errors}
                            btnLabel={t('auth.signup.form.availability')}
                            fields={[{ label: t('auth.signup.form.availability'), value: '' }]}
                            isMulti={false}
                        />
                    </div>
                </>}

            {/* step 5 */}
            {currentStep === 5 &&
                <>
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">Insurance Coverage</h6>
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="insurance_coverage.amount"
                            label={t('auth.signup.form.insuranceCoverage.amount')}
                            control={control}
                            errors={errors}
                            type="number"
                            directlyError={errors?.insurance_coverage?.amount?.message}
                            placeholder={t('auth.signup.form.insuranceCoverage.amount')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="insurance_coverage.details"
                            label={t('auth.signup.form.insuranceCoverage.details')}
                            control={control}
                            errors={errors}
                            type="textarea"
                            rows={4}
                            directlyError={errors?.insurance_coverage?.details?.message}
                            placeholder={t('auth.signup.form.insuranceCoverage.details')}
                        />
                    </div>

                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t('auth.signup.form.returnProcess.policy')}</h6>
                    </div>
                    <div className="col-span-6">
                        <FormCheckbox
                            name="return_process.is_customer_responsible"
                            label={t('auth.signup.form.returnProcess.is_customer_responsible')}
                            control={control}
                            errors={errors}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="return_process.policy"
                            label={t('auth.signup.form.returnProcess.policy')}
                            control={control}
                            errors={errors}
                            type="textarea"
                            rows={4}
                            directlyError={errors?.return_process?.policy?.message}
                            placeholder={t('auth.signup.form.returnProcess.policy')}
                        />
                    </div>

                    <div className="col-span-6">
                        <FormInput
                            name="legal_docs.taxNumber"
                            label={t('auth.signup.taxNumber')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.legal_docs?.taxNumber?.message}
                            placeholder={t('auth.signup.taxNumberPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <FormInput
                            name="legal_docs.nationalId"
                            label={t('auth.riderDocs.nationalId')}
                            control={control}
                            errors={errors}
                            directlyError={errors?.legal_docs?.nationalId?.message}
                            placeholder={t('auth.signup.nationalIdPlaceholder')}
                        />
                    </div>
                    <div className="col-span-6">
                        <h6 className="mb-0 mt-2 popins_medium">{t("auth.signup.form.customerSupport")}</h6>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="customerSupport.email"
                            label={t("auth.signup.form.email")}
                            control={control}
                            errors={errors}
                            type="email"
                            directlyError={errors?.customerSupport?.email?.message}
                            placeholder={t("auth.signup.form.emailPlaceholder")}
                        />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <FormInput
                            name="customerSupport.phone"
                            label={t("auth.signup.form.phoneNumber")}
                            control={control}
                            errors={errors}
                            directlyError={errors?.customerSupport?.phone?.message}
                            placeholder={t("auth.signup.form.phoneNumberPlaceholder")}
                        />
                    </div>
                </>}
        </>
    );
};

const riderDoc = ({ control, clearErrors, errors, setValue, t }) => {

    return (
        <>


        </>
    );
};

const termsConditionsCheck = ({ control, clearErrors, errors, setValue, t }) => {

    return (
        <>
            <div className="col-span-6">
                <div className="col-span-6">
                    <FormCheckbox
                        name="terms_and_conditions.platformTerms"
                        label={t('auth.signup.form.platformTerms')}
                        control={control}
                        errors={errors}
                        directlyError={errors?.terms_and_conditions?.platformTerms?.message}
                    />
                </div>
            </div>
            <div className="col-span-6">
                <div className="col-span-6">
                    <FormCheckbox
                        name="terms_and_conditions.privacyPolicy"
                        label={t('auth.signup.form.privacyPolicy')}
                        control={control}
                        errors={errors}
                        directlyError={errors?.terms_and_conditions?.privacyPolicy?.message}
                    />
                </div>
            </div>
        </>
    );
};


const PackagePlans = () => {
    return (<>
        {brandPlans.map((item, index) => (<PackageCard key={index} btnText={`${item.name} Package`} item={item} />))}

    </>)
}

export { getBrandDetailsSchema, termsConditionsCheck, PackagePlans, riderForm, brandForm, influencerForm, riderDoc, getRiderDetailsSchema, getInfluencerDetailsSchema }