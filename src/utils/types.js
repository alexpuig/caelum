/**
 * Types definition.
 */
module.exports = {
  types: {
    Accumulator: {
      infinity: 'Vec<u8>',
      g: 'Vec<u8>',
      n: 'Vec<u8>',
      h: 'Vec<u8>',
      c: 'Vec<u8>',
      z: 'Vec<u8>',
      q: 'Vec<u8>',
      i: 'u32'
    },
    IdSpaceReleases: {
      _enum: [
        'V1_0_0',
        'V2_0_0'
      ]
    },
    Certificate: {
      // Release of this CID template.
      release: 'IdSpaceReleases',
      // Owner account the creates this CID.
      owner: 'AccountId',
      // Owner's DID.
      did_owner: 'Vec<u8>',
      // Certificate title
      title: 'Vec<u8>',
      // Certificate's URL
      url_certificate: 'Vec<u8>',
      // Certificate's image URL
      url_image: 'Vec<u8>',
      // Certificates type
      cid_type: 'Vec<u8>',
      // Total HIDs issued so far.
      total_hids_issued: 'u64',
      // Certificate is frozen
      is_frozen: 'bool',
      // Block when this template CID was created.
      block_valid_from: 'BlockNumber',
      // Block when this template CID was invalidated. (0 means that it still valid).
      block_valid_to: 'BlockNumber'
    },
    PublicKey: {
      release: 'IdSpaceReleases',
      pub_key: 'Vec<u8>',
      block_valid_from: 'BlockNumber',
      block_valid_to: 'BlockNumber'
    },
    PublicKeyType: {
      release: 'IdSpaceReleases',
      pub_key_type: 'u16',
      pub_keys: 'Vec<PublicKey>',
      block_valid_from: 'BlockNumber',
      block_valid_to: 'BlockNumber'
    },
    Credential: {
      release: 'IdSpaceReleases',
      did: 'Vec<u8>',
      cid: 'Vec<u8>',
      cid_type: 'Vec<u8>',
      path: 'Option<Vec<u8>>',
      is_frozen: 'bool',
      block_valid_from: 'BlockNumber',
      block_valid_to: 'BlockNumber'
    },
    DIDInfo: {
      release: 'IdSpaceReleases',
      name: 'Option<Vec<u8>>',
      address: 'Option<Vec<u8>>',
      postal_code: 'Option<Vec<u8>>',
      city: 'Option<Vec<u8>>',
      country_code: 'Option<Vec<u8>>',
      phone_number: 'Option<Vec<u8>>',
      website: 'Option<Vec<u8>>',
      endpoint: 'Option<Vec<u8>>'
    },
    DIDData: {
      release: 'IdSpaceReleases',
      did_version: 'u8',
      network_id: 'u16',
      did_type: 'u8',
      owner: 'AccountId',
      did_promoter: 'Vec<u8>',
      level: 'u16',
      pub_keys: 'Vec<PublicKeyType>',
      legal_name: 'Vec<u8>',
      tax_id: 'Vec<u8>',
      did_doc: 'Vec<u8>',
      credentials: 'Option<Vec<Vec<u8>>>',
      accumulator: 'Option<Accumulator>',
      info: 'DIDInfo',
      is_frozen: 'bool',
      block_valid_from: 'BlockNumber',
      block_valid_to: 'BlockNumber'
    },
    TokenIdAndCost: {
      register_did: '(AssetId, u64)',
      set_storage_address: '(AssetId, u64)',
      add_organization: '(AssetId, u64)',
      set_key: '(AssetId, u64)',
      put_hash: '(AssetId, u64)',
      change_legal_name_or_tax_id: '(AssetId, u64)',
      update_info: '(AssetId, u64)',
      change_did_owner: '(AssetId, u64)',
      revoke_hash: '(AssetId, u64)',
      remove_did: '(AssetId, u64)',
      add_certificate: '(AssetId, u64)',
      revoke_certificate: '(AssetId, u64)',
      start_process: '(AssetId, u64)',
      start_subprocess: '(AssetId, u64)',
      start_step: '(AssetId, u64)',
      add_document: '(AssetId, u64)',
      add_attachment: '(AssetId, u64)',
      path_to: '(AssetId, u64)',
      get_full_process_tree: '(AssetId, u64)',
      revoke: '(AssetId, u64)'
    },
    NftClassId: 'Vec<u8>',
    NftInstanceId: 'Vec<u8>',
    NftClassDetails:  {
      owner: 'AccountId',
      issuer: 'AccountId',
      admin: 'AccountId',
      freezer: 'AccountId',
      total_deposit: 'DepositBalance',
      free_holding: 'bool',
      instances: 'u32',
      instance_metadatas: 'u32',
      attributes: 'u32',
      is_frozen: 'bool'
    },
    NodeType: {
      _enum: [
        'Process',
        'SubProcess',
        'Step',
        'Document',
        'Attachment',
        'None'
      ]
    },
    ProcessNode: {
      did: 'Vec<u8>',
      account: 'AccountId',
      node_type: 'NodeType',
      parent: 'Option<Vec<u8>>',
      children: 'Option<Vec<Vec<u8>>>',
      created_block: 'BlockNumber',
      valid_until: 'BlockNumber'
    },
    SuspensionJudgement: {
      _enum: [
        'Rebid',
        'Reject',
        'Approve'
      ]
    }
  }
}
