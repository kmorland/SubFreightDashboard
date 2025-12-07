Create a account profile component under features folder, that enables the account to modify their profile.  Please use Angular Material and Signal forms.

a) Account profile, must be able to edit: companyName, contactName, address.
b) Account Profile, must be able to create/edit/view customers.

The account profile object is listed below:

AccountProfile
{
    accountId: string,
    email: string,
    company: {
        companyName: 'ABC Eletric',
        contactName: 'Michael Vanderhook',
        address: Address
    },
    customers: Customer[],
}

Customer {
    customerId: number,
    businessName: string,
    contactName: string,
    emailAddress: string,
    phone: string,
    address: Address,
}

Address {
    address: string,
    address2: string,
    city: string,
    state: string,
    postalCode: string,
}
